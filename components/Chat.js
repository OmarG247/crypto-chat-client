import React from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { colors } from "../styles/colors";
import { containers } from "../styles/containers";
import { typography } from "../styles/typography";
import Header from "./Header";

const messages = [
  {
    type: "incoming",
    time: new Date("March 12, 2021 12:05:00"),
    text: "test message",
  },
  {
    type: "incoming",
    time: new Date("March 12, 2021 12:06:00"),
    text: "test message",
  },
  {
    type: "outgoing",
    time: new Date("March 12, 2021 12:06:30"),
    text: "test message",
  },
  {
    type: "incoming",
    time: new Date("March 12, 2021 12:20:00"),
    text: "test message",
  },
];

const Chat = ({ navigation }) => {
  return (
    <View style={containers.parent}>
      <Header
        options
        handleOptions={() => {}}
        cancel
        cancelText="back"
        handleCancel={() => {
          navigation.goBack();
        }}
        text="Nick Kazan"
      />
      <ScrollView style={containers.basic}>
        {messages.length > 0 &&
          messages.map((message, index) => (
            <Message
              key={`message-${index}`}
              type={message.type}
              text={message.text}
            />
          ))}
      </ScrollView>
    </View>
  );
};

const Message = ({ text, type }) => (
  <View style={MessageStyles.container}>
    <View
      style={
        type === "incoming"
          ? MessageStyles.messageIncoming
          : MessageStyles.messageOutgoing
      }
    >
      <Text style={typography.body}>{text}</Text>
    </View>
  </View>
);

const MessageStyles = StyleSheet.create({
  container: {
    display: "flex",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  messageIncoming: {
    display: "flex",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.dark,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.light,
    maxWidth: "80%",
    alignSelf: "flex-start",
  },
  messageOutgoing: {},
});

export default Chat;
