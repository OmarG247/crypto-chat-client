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
      <Text selectable style={typography.body}>
        {text}
      </Text>
    </View>
  </View>
);

const baseMessageBox = {
  display: "flex",
  paddingVertical: 8,
  paddingHorizontal: 12,
  borderRadius: 10,
  borderWidth: 1,
  maxWidth: "80%",
};
const MessageStyles = StyleSheet.create({
  container: {
    display: "flex",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  messageIncoming: {
    ...baseMessageBox,
    backgroundColor: colors.dark,
    borderColor: colors.light,
    alignSelf: "flex-start",
  },
  messageOutgoing: {
    ...baseMessageBox,
    backgroundColor: colors.bluePrimary,
    borderColor: colors.bluePrimary,
    alignSelf: "flex-end",
  },
});

export default Chat;
