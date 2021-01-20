import React from "react";
import { ImageBackground, StyleSheet } from "react-native";

const ErrorScreen = () => (
  <ImageBackground
    source={require("../assets/no-internet.svg")}
    style={{ width: "50vw", height: "90vh", justifyContent: "center" }}
  ></ImageBackground>
);

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default ErrorScreen;
