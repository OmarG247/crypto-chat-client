import React from "react";
import { Button, StyleSheet, View } from "react-native";

const TestNavigation = ({ navigation }) => {
  return (
    <View style={Styles.container}>
      <Button onPress={() => navigation.navigate("Home")} title="Home" />
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    justifyContent: "space-around",
  },
});

export default TestNavigation;
