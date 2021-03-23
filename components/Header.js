import React from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import { colors } from "../styles/colors";
import { typography } from "../styles/typography";
import Fab from "./Fab";
import { BlurView } from "expo-blur";
import { headerHeight, STATUS_BAR_HEIGHT } from "../styles/containers";

const Header = ({
  text,
  options = false,
  handleOptions = null,
  cancelText,
  handleCancel = null,
  style,
}) => (
  <BlurView tint="dark" intensity={90} style={[HeaderStyles.container, style]}>
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
  </BlurView>
);

const HeaderStyles = StyleSheet.create({
  container: {
    position: "absolute",
    display: "flex",
    height: headerHeight + STATUS_BAR_HEIGHT,
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
