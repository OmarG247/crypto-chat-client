import React from "react";
import { View } from "react-native";

const Spacer = ({ height, width, style }) => (
  <View style={[{ height, width }, style]} />
);

export default Spacer;
