import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../styles/colors";
import { typography } from "../styles/typography";

const Option = ({ text, onPress, color = colors.light, style }) => (
  <TouchableOpacity onPress={onPress} style={[OptionStyles.container, style]}>
    <Text style={[typography.subtitle, { color }]}>{text}</Text>
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
