import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Fab from "./Fab";

const Footer = ({ action, handleAction, actionDisabled = false, style }) => (
  <LinearGradient
    colors={["rgba(33, 33, 33, 0)", "rgba(239, 239, 239, 0.1)"]}
    style={[FooterStyles.container, style]}
  >
    {action && (
      <Fab
        disabled={actionDisabled}
        action={action}
        color="lime"
        size="large"
        onPress={handleAction}
      ></Fab>
    )}
  </LinearGradient>
);

const FooterStyles = StyleSheet.create({
  container: {
    display: "flex",
    height: 96,
    width: "100%",
    paddingHorizontal: 16,
    alignItems: "flex-end",
    position: "absolute",
    overflow: "visible",
    bottom: 0,
  },
});

export default Footer;
