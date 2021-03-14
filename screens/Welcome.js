import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { containers } from "../styles/containers";
import { effects } from "../styles/effects";
import { typography } from "../styles/typography";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Input from "../components/Input";
import icon from "../assets/icon-color.png";

const Welcome = () => {
  return (
    <View style={containers.parent}>
      <View style={[containers.main, WelcomeStyles.container]}>
        <View style={[WelcomeStyles.iconContainer, effects.glow]}>
          <Image style={[WelcomeStyles.icon]} source={icon} />
        </View>
        <Text style={[typography.display, WelcomeStyles.text, effects.glow]}>
          Welcome to a new kind of security
        </Text>
        <Input style={WelcomeStyles.input} label="username" />
        <Button text="chat" color="lime" style={WelcomeStyles.button} />
      </View>
      <Footer />
    </View>
  );
};

const WelcomeStyles = StyleSheet.create({
  container: {
    paddingTop: 56,
    paddingBottom: 32,
  },
  icon: {
    resizeMode: "contain",
    width: 80,
    marginBottom: -20,
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
  },
  input: {
    paddingVertical: 24,
  },
  text: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  button: {
    margin: 16,
    alignSelf: "flex-end",
  },
});

export default Welcome;
