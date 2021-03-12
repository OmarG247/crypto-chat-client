import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../styles/colors";
import { containers } from "../styles/containers";
import { typography } from "../styles/typography";
import Button from "./Button";
import Contact from "./Contact";
import Fab from "./Fab";
import Footer from "./Footer";
import Header from "./Header";
import Option from "./Option";
import Spacer from "./Spacer";

const sampleContact = {
  name: "Nick Kazan",
  color: colors.tealSecondary,
};

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
        <Contact onPress={() => {}} newMessage contact={sampleContact} />
        <Contact onPress={() => {}} newMessage contact={sampleContact} />
        <Contact onPress={() => {}} newMessage contact={sampleContact} />
        <Contact onPress={() => {}} newMessage contact={sampleContact} />
        <Contact onPress={() => {}} newMessage contact={sampleContact} />
        <Contact onPress={() => {}} newMessage contact={sampleContact} />
        <Contact onPress={() => {}} newMessage contact={sampleContact} />
        <Spacer />
      </ScrollView>
      {/* <Button text="test" color="lime" onPress={() => {}} /> */}
      {/* <Fab action="new" color="lime" /> */}
      <Footer action="new" handleAction={() => {}} />
    </View>
  );
};

export default Home;
