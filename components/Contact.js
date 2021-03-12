import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../styles/colors";
import { typography } from "../styles/typography";
import Divider from "./Divider";

const Contact = ({ contact, newMessage, onPress }) => (
  <View style={ContactStyles.container}>
    <TouchableOpacity onPress={onPress} style={ContactStyles.content}>
      <View style={ContactStyles.name}>
        <View style={[ContactStyles.bar, { backgroundColor: contact.color }]} />
        <Text style={typography.subtitle}>{contact.name}</Text>
      </View>
      {newMessage && <View style={ContactStyles.alert} />}
    </TouchableOpacity>
    <Divider />
  </View>
);

const ContactStyles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
  },
  content: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    display: "flex",
    flexDirection: "row",
  },
  bar: {
    height: 26,
    width: 4,
    marginRight: 12,
  },
  alert: {
    height: 8,
    width: 8,
    backgroundColor: colors.limeAccent,
    borderRadius: 100,
    marginRight: 12,
    shadowColor: colors.limeAccent,
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
});

export default Contact;
