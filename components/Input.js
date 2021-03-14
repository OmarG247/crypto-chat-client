import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { colors } from "../styles/colors";
import { typography } from "../styles/typography";

const Input = ({ label, error, placeholder, onChangeText, style }) => (
  <View style={[InputStyles.container, style]}>
    <Text style={[typography.detail, InputStyles.label]}>{label}</Text>
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={colors.surface}
      onChangeText={onChangeText}
      style={[
        InputStyles.input,
        { borderBottomColor: error ? colors.redError : colors.limeAccent },
      ]}
    />
    {error && (
      <Text style={[typography.detail, InputStyles.error]}>{error}</Text>
    )}
  </View>
);

const InputStyles = StyleSheet.create({
  container: {
    display: "flex",
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: "100%",
    position: "relative",
  },
  label: {
    marginBottom: 4,
    color: colors.limeAccent,
  },
  input: {
    color: colors.light,
    paddingBottom: 4,
    borderBottomWidth: 1,
    width: "100%",
  },
  error: {
    position: 'absolute',
    left: 16,
    bottom: 0,
    color: colors.redError,
  },
});

export default Input;
