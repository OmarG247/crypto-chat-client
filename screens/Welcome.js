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
        <Input style={WelcomeStyles.input} label="password" />
        <View style={WelcomeStyles.actions}>
          <Button text="register" color="lime" secondary style={WelcomeStyles.button} />
          <Button text="login" color="lime" />
        </View>
      </View>
      <Footer />
    </View>
  );
};

const WelcomeStyles = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingBottom: 32,
  },
  icon: {
    resizeMode: "contain",
    width: 80,
    aspectRatio: 1,
    marginBottom: -20,
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
  },
  input: {
    paddingVertical: 16,
  },
  text: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  button: {
    marginRight: 12,
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'flex-end',
    margin: 16,
  }
});

export default Welcome;
