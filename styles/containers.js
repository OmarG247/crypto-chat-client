import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const containers = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  basic: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    paddingVertical: 16,
  },
});
