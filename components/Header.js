import React from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import { colors } from "../styles/colors";
import { typography } from "../styles/typography";
import Fab from "./Fab";

const Header = ({
  text,
  options = false,
  handleOptions = null,
  cancelText,
  handleCancel = null,
  style,
}) => (
  <View style={[HeaderStyles.container, style]}>
    {cancelText && (
      <TouchableHighlight style={{ padding: 16 }} onPress={handleCancel}>
        <Text style={typography.detail}>{cancelText}</Text>
      </TouchableHighlight>
    )}
    <View
      style={[
        HeaderStyles.content,
        { justifyContent: options ? "space-between" : "flex-start" },
      ]}
    >
      <Text style={typography.header2}>{text}</Text>
      {options && (
        <Fab
          onPress={handleOptions}
          action="options"
          secondary
          color="lime"
        ></Fab>
      )}
    </View>
  </View>
);

const HeaderStyles = StyleSheet.create({
  container: {
    display: "flex",
    height: 124,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    backgroundColor: colors.darkSurface,
  },
  content: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    height: 52,
    width: "100%",
    paddingHorizontal: 16,
  },
});

export default Header;
