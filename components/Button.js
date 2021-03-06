import React from "react";
import { StyleSheet, TouchableHighlight, Text } from "react-native";
import { colors } from "../styles/colors";
import { typography } from "../styles/typography";

const buttonColors = {
  blue: colors.bluePrimary,
  teal: colors.tealSecondary,
  lime: colors.limeAccent,
};

const Button = ({ text, color, secondary = false, onPress }) => {
  const buttonColor = buttonColors[color];
  const buttonTextStyle = () =>
    secondary ? { color: colors.light } : { color: colors.dark };
  const buttonContainerStyle = () =>
    secondary
      ? { backgroundColor: colors.dark }
      : {
          backgroundColor: buttonColor,
          shadowColor: buttonColor,
          shadowOpacity: 0.25,
          shadowRadius: 12,
        };
  const buttonBase = () => {
    return {
      borderColor: buttonColor,
      ...buttonContainerStyle(),
    };
  };

  return (
    <TouchableHighlight
      activeOpacity={0.5}
      underlayColor={secondary ? colors.dark : buttonColor}
      onPress={onPress}
      style={[ButtonStyles.container, buttonBase()]}
    >
      <Text style={[typography.button, buttonTextStyle()]}>{text}</Text>
    </TouchableHighlight>
  );
};

const ButtonStyles = StyleSheet.create({
  container: {
    display: "flex",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 2,
  },
});

export default Button;
