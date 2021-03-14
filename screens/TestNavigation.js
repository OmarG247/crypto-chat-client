import React from "react";
import { View } from "react-native";
import { containers } from "../styles/containers";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Option from "../components/Option";

const TestNavigation = ({ navigation }) => {
  return (
    <View style={containers.parent}>
      <Header text="Screens" />
      <View style={containers.main}>
        <Option onPress={() => navigation.navigate("Home")} text="Home" />
        <Option onPress={() => navigation.navigate("Chat")} text="Chat" />
        <Option onPress={() => navigation.navigate("Welcome")} text="Welcome" />
        <Option
          onPress={() => navigation.navigate("Contacts")}
          text="Contacts"
        />
        <Option
          onPress={() => navigation.navigate("NewMessage")}
          text="New Message"
        />
      </View>
      <Footer />
    </View>
  );
};

export default TestNavigation;
