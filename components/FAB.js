import React from "react";
import { StyleSheet, TouchableHighlight } from "react-native";
import { colors } from "../styles/colors";
import Icon from "./Icon";

const fabColors = {
  blue: colors.bluePrimary,
  teal: colors.tealSecondary,
  lime: colors.limeAccent,
};

const Fab = ({ color, action, secondary = false, size = "medium" }) => {
  const dimensions = size === "large" ? 48 : 36;
  const fabColor = fabColors[color];

  const fabShadow = () =>
    secondary
      ? {}
      : {
          shadowColor: buttonColor,
          shadowOpacity: 0.25,
          shadowRadius: 12,
        };

  const fabBase = {
    height: dimensions,
    width: dimensions,
    backgroundColor: secondary ? colors.dark : fabColor,
    ...fabShadow(),
  };

  return (
    <TouchableHighlight style={[FabStyles.container, fabBase]}>
      <Icon name={action} color={secondary ? "light" : "dark"} />
    </TouchableHighlight>
  );
};

const FabStyles = StyleSheet.create({
  container: {
    display: "flex",
  },
});

export default Fab;
