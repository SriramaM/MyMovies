import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Button, Text, View, ImageBackground } from "react-native";
import Getdata from "./Components/Secound/Getdata.js";
import Inputs from "./Components/Main/Inputs.js";
import styles from "./Components/AppStyleSheet.js";

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Welcome to MyApp" }}
        />
        <Stack.Screen name="BackToHomePage" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      style={styles.img}
      source={require("./Components/Main/bg.jpg")}
    >
      <View>
        <Button
          title="Here is your movies"
          onPress={() =>
            navigation.navigate("BackToHomePage", { name: "Jane" })
          }
        />
      </View>
      <Inputs />
    </ImageBackground>
  );
};
const ProfileScreen = () => {
  return <Getdata />;
};

export default App;
