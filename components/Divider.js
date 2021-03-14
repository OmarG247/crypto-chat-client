import React from "react";
import { View } from "react-native";
import { colors } from "../styles/colors";

const Divider = ({ style }) => (
  <View
    style={[
      { width: "100%", height: 2, backgroundColor: colors.surface10 },
      style,
    ]}
  />
);

export default Divider;
