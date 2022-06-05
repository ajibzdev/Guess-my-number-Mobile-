import { StyleSheet, Text, View, Platform } from "react-native";
import React from "react";
import Colors from "../../constants/colors";

const Title = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
    color: Colors.white,
    // // borderWidth: Platform.OS === "android" ? 2 : 0,
    // borderWidth: Platform.select({ ios: 0, android: 2 }),
    // borderColor: Colors.white,
    padding: 24,
    textAlign: "center",
    maxWidth: "80%",
    width: 300,
  },
});
