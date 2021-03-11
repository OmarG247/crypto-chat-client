import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { colors } from "../styles/colors";
import { typography } from "../styles/typography";
import Button from "./Button";
import Fab from "./Fab";
import Footer from "./Footer";
import Header from "./Header";

const Home = () => {
  return (
    <View
      style={{
        height: "100%",
        backgroundColor: colors.dark
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
      <Footer action="new" handleAction={() => {}} />
    </View>
  );
};

export default Home;
