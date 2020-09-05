import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
  ImageBackground,
} from "react-native";

import styles from "../AppStyleSheet.js";
const { width, height } = Dimensions.get("window");

class Inputs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      FilmName: "",
      FilmRating: "",
      jwtToken: "",
    };
  }

  clearText() {
    this.setState({ Username: "" });
    this.setState({ FilmName: "" });
    this.setState({ FilmRating: "" });
  }
  async SoundOnPress(altertno) {
    if (altertno == 1) {
      try {
        const { sound: soundObject, status } = await Audio.Sound.createAsync(
          require("../../assets/airhorn.mp3"),
          {
            shouldPlay: true,
          }
        );
      } catch (error) {
        console.log(error);
      }
      alert("Hey hi!! You have succcesfully logged in");
    }
  }

  createFilm = () => {
    var FilmName = this.state.FilmName;
    var FilmRating = this.state.FilmRating;
    var patternFilm = /^([a-zA-Z0-9]+)| ^([#?!@$%^&*.=/-])$/;
    var patternRating = /^[0-5]$/;

    if (patternFilm.test(FilmName) && patternRating.test(FilmRating)) {
      try {
        fetch("http://192.168.0.28:8080/api/v1/films", {
          method: "POST",
          body: JSON.stringify({
            name: FilmName,
            frating: FilmRating,
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.state.jwtToken,
          },
        }).then((resp) => {
          setTimeout(function () {
            if (resp.status == 200) {
              resp.json().then((results) => {
                if (results.name == FilmName) {
                  alert("Film details added successfully.");
                } else alert("Duplicate film name");
              });
            } else {
              alert("403 Error- Please enter username first");
            }
          }, 0);
        });
      } catch (e) {
        console.log(e);
        console.log("............");
      }
    } else if (patternFilm.test(FilmName) && !patternRating.test(FilmRating))
      alert("Please enter  valid Rating between 0 to 5");
    else if (!patternFilm.test(FilmName) && patternRating.test(FilmRating))
      alert("Please enter valid film name");
    else alert("Please enter valid film and its rating");

    this.clearText();
  };

  updateFilms = () => {
    var FilmName = this.state.FilmName;
    var FilmRating = this.state.FilmRating;
    patternFilm = /^([a-zA-Z0-9]+)| ^([#?!@$%^&*.=/-])$/;
    patternRating = /^[0-5]$/;
    if (patternFilm.test(FilmName) && patternRating.test(FilmRating)) {
      try {
        fetch("http://192.168.0.28:8080/api/v1/filmupdate", {
          method: "PUT",
          body: JSON.stringify({
            name: FilmName,
            frating: FilmRating,
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.state.jwtToken,
          },
        }).then((resp) => {
          setTimeout(function () {
            if (resp.status == 200) {
              resp.json().then((results) => {
                if (results.ok == 1 && results.nModified > 0 && results.n > 0)
                  alert("updated successfully");
                else alert("Film name is not in your movie list");
              });
            } else alert("403 Error-Enter username first");
          }, 0);
        });
      } catch (e) {
        console.log(e);
        console.log("-----------");
      }
    } else if (!patternFilm.test(FilmName) && !patternRating.test(FilmRating))
      alert("Please enter valid Film Name and valid Rating ");
    else if (patternFilm.test(FilmName) && !patternRating.test(FilmRating))
      alert("Please enter  valid Rating between 0 to 5");
    else if (!patternFilm.test(FilmName) && patternRating.test(FilmRating))
      alert("Please enter  valid Film Name ");

    this.clearText();
  };

  login = (uname) => {
    var patternLogin = /^([a-zA-Z0-9]+)| ^([#?!@$%^&*.=/-])$/;
    if (patternLogin.test(uname)) {
      this.SoundOnPress(1);
      try {
        fetch("http://192.168.0.28:8080/api/v1/login", {
          method: "POST",
          body: JSON.stringify({
            username: uname,
          }),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            jwtToken = data.token;
            this.setState({ jwtToken: jwtToken });
          });
      } catch (e) {
        console.log(e);
        console.log("..............");
      }
    } else alert("Please enter valid username");
    this.clearText();
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Username"
              placeholderTextColor="#9a73ef"
              autoCapitalize="none"
              onChangeText={(Username) => this.setState({ Username: Username })}
              value={this.state.Username}
            />
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {
                this.login(this.state.Username);
              }}
            >
              <Text style={styles.submitButtonText}> Login </Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            //underlineColorAndroid="transparent"
            placeholder="Film Name"
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            onChangeText={(FilmName) => this.setState({ FilmName: FilmName })}
            value={this.state.FilmName}
          />

          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Film Rating"
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            onChangeText={(Rating) => this.setState({ FilmRating: Rating })}
            value={this.state.FilmRating}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => this.createFilm()}
            >
              <Text style={styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.updateButton}
              onPress={() => this.updateFilms()}
            >
              <Text style={styles.submitButtonText}> Modify </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default Inputs;
