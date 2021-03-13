import React from "react";
import { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { colors } from "../styles/colors";
import { containers } from "../styles/containers";
import { typography } from "../styles/typography";
import Divider from "./Divider";
import Fab from "./Fab";
import Header from "./Header";
import Spacer from "./Spacer";

const TIME_DIFFERENCE = 10;

const sampleMessages = [
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
  {
    type: "incoming",
    time: new Date("March 14, 2021 12:37:00"),
    text: "test message",
  },
  {
    type: "outgoing",
    time: new Date("March 17, 2021 12:32:00"),
    text: "long message",
  },
];

const timeBetween = (timeA, timeB) =>
  (timeA.getTime() - timeB.getTime()) / 60 / 1000 > TIME_DIFFERENCE;

const Chat = ({ navigation }) => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [messages, setMessages] = useState(sampleMessages);
  const keyboardOnListener = useRef();
  const keyboardOffListener = useRef();

  useEffect(() => {
    keyboardOnListener.current = Keyboard.addListener(
      "keyboardWillShow",
      (event) => {
        setKeyboardHeight(event.endCoordinates.height);
      }
    );
    keyboardOffListener.current = Keyboard.addListener(
      "keyboardWillHide",
      () => {
        setKeyboardHeight(0);
      }
    );
  }, []);

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
      <ScrollView style={[containers.basic, { marginBottom: keyboardHeight }]}>
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
        {keyboardHeight > 0 && <Spacer height={16 + 52} />}
      </ScrollView>
      <View
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          position: "absolute",
          bottom: keyboardHeight,
          marginBottom: 20,
        }}
      >
        <TextInput style={{ color: colors.tealSecondary, width: "50%" }}>
          enter
        </TextInput>
        <Fab color="blue" action="send" />
      </View>
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
