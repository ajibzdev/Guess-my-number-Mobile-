import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../../constants/colors";

const InstructionText = ({ children, style }) => {
  return <Text style={[styles.instruction, style]}>{children}</Text>;
};

export default InstructionText;

const styles = StyleSheet.create({
  instruction: {
    color: Colors.accent500,
    fontSize: 24,
    fontFamily: "open-sans",
    marginVertical: 4,
  },
});
