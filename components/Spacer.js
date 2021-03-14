import React from "react";
import { View } from "react-native";

const Spacer = ({ height, style }) => (
  <View style={[{ height: height }, style]} />
);

export default Spacer;
