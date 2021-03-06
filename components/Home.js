import React from "react";
import { Button, Text, StyleSheet, View } from "react-native";
import { typography } from "../shared/typography";

const Home = () => {
  return (
    <View
      style={{
        height: "100%",
      }}
    >
      <Text style={typography.display}>This is home</Text>
    </View>
  );
};

export default Home;
