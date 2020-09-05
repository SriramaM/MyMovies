import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    paddingTop: 23,
  },

  input: {
    margin: 15,
    height: 40,
    borderColor: "#006400",
    borderWidth: 1,
    fontSize: 20,
    backgroundColor: "#fff8dc",
    top: 1,
    borderRadius: 10,
  },
  buttonContainer: {
    borderWidth: 15,
    backgroundColor: "#fffff0",
    margin: 70,
    borderColor: "#fffff0",
    borderRadius: 15,
  },

  img: {
    width: "100%",
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },

  submitButton: {
    backgroundColor: "#033219",
    padding: 10,
    width: 80,
    borderRadius: 15,
    alignSelf: "flex-start",
  },
  loginButton: {
    backgroundColor: "#033219",
    padding: 10,
    margin: 15,
    width: 120,
    alignSelf: "center",
    borderRadius: 15,
  },
  displayButton: {
    backgroundColor: "#033219",
    padding: 10,
    width: "100%",
    borderRadius: 15,
    alignSelf: "flex-start",
    position: "absolute",
  },

  updateButton: {
    backgroundColor: "#033219",
    padding: 10,
    width: 80,
    position: "absolute",
    borderRadius: 15,
    alignSelf: "flex-end",
  },

  submitButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },

  containertable: {
    flex: 1,
    padding: 18,
  },
  HeadStyle: {
    height: 50,
    alignContent: "center",
    backgroundColor: "#add8e6",
    borderRadius: 15,
    borderWidth: 3,
  },
  TableText: {
    margin: 1,
    fontSize: 17,
    textAlign: "center",
    color: "#2f4f4f",
    fontStyle: "italic",
    fontWeight: "bold",
  },
});
