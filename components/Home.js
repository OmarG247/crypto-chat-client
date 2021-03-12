import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../styles/colors";
import { containers } from "../styles/containers";
import { typography } from "../styles/typography";
import Button from "./Button";
import Fab from "./Fab";
import Footer from "./Footer";
import Header from "./Header";
import Option from "./Option";
import Spacer from "./Spacer";

const Home = () => {
  return (
    <View
      style={{
        height: "100%",
        backgroundColor: colors.dark,
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
      <ScrollView style={containers.basic}>
        <Option text="test" onPress={() => {}} />
        <Option text="test" onPress={() => {}} />
        <Option text="test" onPress={() => {}} />
        <Option text="test" onPress={() => {}} />
        <Option text="test" onPress={() => {}} />
        <Option text="test" onPress={() => {}} />
        <Option text="test" onPress={() => {}} />
        <Option text="test" onPress={() => {}} />
        <Option text="test" onPress={() => {}} />
        <Option text="test" onPress={() => {}} />
        <Option text="test" onPress={() => {}} />
        <Option text="test" onPress={() => {}} />
        <Option text="test" onPress={() => {}} />
        <Option text="test" onPress={() => {}} />
        <Option text="test" onPress={() => {}} />
        <Option text="test" onPress={() => {}} />
        <Option text="test" onPress={() => {}} />
        <Option text="test" onPress={() => {}} />
        <Spacer />
      </ScrollView>
      {/* <Button text="test" color="lime" onPress={() => {}} /> */}
      {/* <Fab action="new" color="lime" /> */}
      <Footer action="new" handleAction={() => {}} />
    </View>
  );
};

export default Home;
