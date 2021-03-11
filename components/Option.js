import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { typography } from "../styles/typography";

const Option = ({ text, onPress }) => (
  <TouchableOpacity onPress={onPress} style={OptionStyles.container}>
    <Text style={typography.subtitle}>{text}</Text>
  </TouchableOpacity>
);

const OptionStyles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: "flex-start",
  },
});

export default Option;
