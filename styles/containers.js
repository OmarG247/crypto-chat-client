import { StyleSheet } from "react-native";
import { colors } from "./colors";
import { Platform } from "react-native";

export const containers = StyleSheet.create({
  parent: {
    position: "relative",
    flex: 1,
    backgroundColor: colors.dark,
    paddingTop: STATUS_BAR_HEIGHT,
  },
  main: {
    width: "100%",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    paddingTop: 16,
  },
});

export const headerHeight = 124;
export const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? 20 : 20;
