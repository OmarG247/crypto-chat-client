import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { typography } from "../styles/typography";
import Button from "./Button";
import Fab from "./Fab";

const Home = () => {
  return (
    <View
      style={{
        height: "100%",
        padding: 20,
      }}
    >
      <Text style={typography.display}>This is home</Text>
      <Button text="test" color="lime" onPress={() => {}} />
      <Fab action="new" color="lime" />
    </View>
  );
};

export default Home;
