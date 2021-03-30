import { StyleSheet } from "react-native";
import { colors } from "./colors";
import { Platform } from "react-native";

export const headerHeight = 124;
export const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? 20 : 0;

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
  modalContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 6,
    backgroundColor: colors.darkSurface,
  },
  modal: {
    display: "flex",
    padding: 24,
    alignItems: "center",
    backgroundColor: colors.dark,
    borderRadius: 10,
    borderColor: colors.surface10,
    borderWidth: 1,
  },
});
