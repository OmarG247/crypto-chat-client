import React from "react";
import { ScrollView, StyleSheet, View, Text, TextBase } from "react-native";
import { colors } from "../styles/colors";
import { containers } from "../styles/containers";
import { typography } from "../styles/typography";
import Divider from "./Divider";
import Header from "./Header";

const TIME_DIFFERENCE = 10;

const messages = [
  {
    type: "incoming",
    time: new Date("March 12, 2021 12:05:00"),
    text: "test message",
  },
  {
    type: "incoming",
    time: new Date("March 12, 2021 12:06:00"),
    text: "test message very very very very very very very long message",
  },
  {
    type: "outgoing",
    time: new Date("March 12, 2021 12:06:30"),
    text: "test message",
  },
  {
    type: "incoming",
    time: new Date("March 12, 2021 12:37:00"),
    text: "test message",
  },
  {
    type: "outgoing",
    time: new Date("March 13, 2021 12:32:00"),
    text: "long message",
  },
];

const timeBetween = (timeA, timeB) =>
  (timeA.getTime() - timeB.getTime()) / 60 / 1000 > TIME_DIFFERENCE;

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
            <View key={`message-${index}`}>
              {index > 1 &&
                timeBetween(message.time, messages[index - 1].time) && (
                  <Divider />
                )}
              <Message
                timeStamp={
                  index > 1 &&
                  timeBetween(message.time, messages[index - 1].time)
                    ? message.time
                    : false
                }
                type={message.type}
                text={message.text}
              />
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

const Message = ({ text, type, timeStamp }) => (
  <View style={MessageStyles.container}>
    {timeStamp && (
      <Text
        style={[
          typography.detail,
          MessageStyles.timeStamp,
          {
            marginBottom: 8,
            marginLeft: type === "incoming" ? 12 : 0,
            marginRight: type === "outgoing" ? 12 : 0,
            textAlign: type === "incoming" ? "left" : "right",
          },
        ]}
      >
        {`${timeStamp
          .getHours()
          .toString()}:${timeStamp.getMinutes().toString()}`}
      </Text>
    )}
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
  timeStamp: {
    color: colors.surface,
    marginBottom: 8,
  },
});

export default Chat;
