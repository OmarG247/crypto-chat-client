import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const containers = StyleSheet.create({
  parent: {
    position: 'relative',
    flex: 1,
    backgroundColor: colors.dark,
  },
  main: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    paddingVertical: 16,
  },
});
