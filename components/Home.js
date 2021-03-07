import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { typography } from "../styles/typography";
import Button from "./Button";
import Fab from "./Fab";
import Header from "./Header";

const Home = () => {
  return (
    <View
      style={{
        height: "100%",
      }}
    >
      <Header
        options
        handleOptions={() => {}}
        cancel
        cancelText="back"
        handleCancel={() => {}}
        text="header"
      />
      <Button text="test" color="lime" onPress={() => {}} />
      <Fab action="new" color="lime" />
    </View>
  );
};

export default Home;
