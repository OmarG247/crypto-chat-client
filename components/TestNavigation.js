import React from "react";
import { View } from "react-native";
import { containers } from "../styles/containers";
import Footer from "./Footer";
import Header from "./Header";
import Option from "./Option";
import Button from './Button';

const TestNavigation = ({ navigation }) => {
  return (
    <View style={containers.parent}>
      <Header text="Screens" />
      <View style={containers.basic}>
        <Option onPress={() => navigation.navigate("Home")} text="Home" />
        <Option onPress={() => navigation.navigate("Chat")} text="Chat" />
        <Button onPress={() => navigation.navigate("Chat")} text="Chat" color="lime" />
      </View>
      <Footer />
    </View>
  );
};

export default TestNavigation;
