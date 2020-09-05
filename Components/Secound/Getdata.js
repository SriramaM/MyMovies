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
import { Table, Row, Rows } from "react-native-table-component";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jwtToken: "",
      tableData: "",
      tableHead: "",
      show: "",
    };
  }

  isDisplay = () => {
    if (this.state.show == false) {
      this.setState({ show: true });
    }
  };

  getFilms = () => {
    var filmdata = [];
    var tableData = [];
    var tableHead = [];
    try {
      fetch("http://192.168.0.28:8080/api/v1/films", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((results) => {
          results.forEach((data) => {
            filmdata.push(data.name);
            filmdata.push(data.frating);
            tableData.push(filmdata);
            filmdata = [];
          });
          if (tableData.length != 0) tableHead = ["FILM NAME", "RATING"];
          else tableHead = ["No data to display in the movie list"];
          this.setState({ tableHead: tableHead });
          this.setState({ tableData: tableData });
        });
    } catch (e) {
      console.log(e);
      console.log("............");
    }
  };

  render() {
    return (
      <ImageBackground style={styles.img} source={require("./bg.jpg")}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.displayButton}
            onPress={() => {
              this.getFilms();
              this.isDisplay();
            }}
          >
            <Text style={styles.submitButtonText}> Display </Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.containertable}>
            {this.state.show ? (
              <Table
                borderStyle={{
                  borderWidth: 1,
                  borderRadius: 10,
                  width: 80,
                  alignSelf: "center",
                }}
              >
                <Row
                  data={this.state.tableHead}
                  style={styles.HeadStyle}
                  textStyle={styles.TableText}
                />
                <Rows
                  data={this.state.tableData}
                  style={styles.HeadStyle}
                  textStyle={styles.TableText}
                />
              </Table>
            ) : null}
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

export default Login;
