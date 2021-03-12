import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { containers } from "../styles/containers";
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

const Message = ({ text, type }) => <View></View>;

const MessageStyles = StyleSheet.create({
  container: {
    display: "flex",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  message: {},
});

export default Chat;
