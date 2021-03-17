import { StyleSheet } from "react-native";
import { colors } from "./colors";

/**
 *? Every font size is equal to the design system's size + 2 for scalability
 */

export const typography = StyleSheet.create({
  display: {
    fontSize: 50,
    fontFamily: "DMSans-Regular",
    color: colors.light,
  },
  header1: {
    fontSize: 34,
    fontFamily: "DMSans-Regular",
    color: colors.light,
  },
  header2: {
    fontSize: 26,
    fontFamily: "DMSans-Regular",
    color: colors.light,
  },
  subtitle: {
    fontSize: 22,
    fontFamily: "DMSans-Regular",
    color: colors.light,
  },
  button: {
    fontSize: 18,
    fontFamily: "DMSans-Medium",
    color: colors.light,
  },
  detail: {
    fontSize: 14,
    fontFamily: "DMSans-Regular",
    color: colors.light,
  },
  body: {
    fontSize: 18,
    fontFamily: "SourceSansPro-Regular",
    color: colors.light,
  },
});
