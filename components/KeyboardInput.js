import React from "react";
import { StyleSheet, TextInput, KeyboardAvoidingView } from "react-native";
import { colors } from "../styles/colors";
import Fab from "./Fab";

const KeyboardInput = ({ onChangeText, onPress, action, style }) => (
  <KeyboardAvoidingView
    behavior="padding"
    keyboardVerticalOffset={28}
    style={[
      KeyboardInputStyles.container,
      {
        marginBottom: 40,
      },
      style,
    ]}
  >
    <TextInput
      keyboardAppearance="dark"
      placeholder="Aa"
      placeholderTextColor={colors.surface}
      style={KeyboardInputStyles.text}
      onChangeText={onChangeText}
    />
    <Fab color="blue" action={action} onPress={onPress} />
  </KeyboardAvoidingView>
);

const KeyboardInputStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.dark,
  },
  text: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.grey,
    marginRight: 8,
    borderRadius: 10,
    color: colors.light,
  },
});

export default KeyboardInput;
