import React from "react";
import { View } from "react-native";
import { containers } from "../styles/containers";
import Button from "./Button";
import Footer from "./Footer";
import Header from "./Header";

const TestNavigation = ({ navigation }) => {
  return (
    <View style={containers.parent}>
      <Header text="Screens" />
      <View style={[containers.basic, { paddingHorizontal: 16 }]}>
        <Button
          onPress={() => navigation.navigate("Home")}
          text="Home"
          color="lime"
        />
      </View>
      <Footer />
    </View>
  );
};

export default TestNavigation;
