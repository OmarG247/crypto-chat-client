import React from "react";
import { StyleSheet, TouchableHighlight, Text } from "react-native";
import { colors } from "../styles/colors";
import { typography } from "../styles/typography";

const buttonColors = {
  blue: colors.bluePrimary,
  teal: colors.tealSecondary,
  lime: colors.limeAccent,
};

const Button = ({
  text,
  color = "lime",
  secondary = false,
  onPress,
  disabled = false,
  expanded = false,
  style,
}) => {
  const buttonColor = buttonColors[color];

  const buttonTextStyle = {
    color: secondary && !disabled ? colors.light : colors.dark,
  };

  const buttonShadows = () =>
    secondary || disabled
      ? {}
      : {
          shadowColor: buttonColor,
          shadowOpacity: 0.25,
          shadowRadius: 12,
        };

  const buttonWidth = () => (expanded ? { width: "100%" } : {});

  const buttonBase = {
    borderColor: disabled ? colors.grey : buttonColor,
    backgroundColor: disabled
      ? colors.grey
      : secondary
      ? colors.dark
      : buttonColor,
    ...buttonShadows(),
    ...buttonWidth(),
  };

  return (
    <TouchableHighlight
      disabled={disabled}
      activeOpacity={0.5}
      underlayColor={secondary ? colors.dark : buttonColor}
      onPress={onPress}
      style={[ButtonStyles.container, buttonBase, style]}
    >
      <Text style={[typography.button, buttonTextStyle]}>{text}</Text>
    </TouchableHighlight>
  );
};

const ButtonStyles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: "flex-start",
  },
});

export default Button;
