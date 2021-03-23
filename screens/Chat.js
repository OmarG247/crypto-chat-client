import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { ScrollView, StyleSheet, View, Text, Keyboard } from "react-native";
import { colors } from "../styles/colors";
import { containers } from "../styles/containers";
import { typography } from "../styles/typography";
import Divider from "../components/Divider";
import Header from "../components/Header";
import KeyboardInput from "../components/KeyboardInput";
import Spacer from "../components/Spacer";

const TIME_DIFFERENCE = 10;

const sampleMessages = [
  {
    senderId: "nick",
    time: new Date("March 12, 2021 12:05:00"),
    text: "test message",
  },
  {
    senderId: "nick",
    time: new Date("March 12, 2021 12:06:00"),
    text: "test message very very very very very very very long message",
  },
  {
    senderId: "zach",
    time: new Date("March 12, 2021 12:06:30"),
    text: "test message",
  },
  {
    senderId: "zach",
    time: new Date("March 12, 2021 12:37:00"),
    text: "test message",
  },
  {
    senderId: "nick",
    time: new Date("March 13, 2021 12:32:00"),
    text: "long message",
  },
  {
    senderId: "nick",
    time: new Date("March 14, 2021 12:37:00"),
    text: "test message",
  },
  {
    senderId: "nick",
    time: new Date("March 17, 2021 12:32:00"),
    text: "long message",
  },
  {
    senderId: "zach",
    time: new Date("March 17, 2021 12:34:00"),
    text: "long message",
  },
  {
    senderId: "zach",
    time: new Date("March 17, 2021 13:34:00"),
    text: "test message",
  },
  {
    senderId: "zach",
    time: new Date("March 17, 2021 13:36:00"),
    text: "long message",
  },
];

const timeBetween = (timeA, timeB) =>
  (timeA.getTime() - timeB.getTime()) / 60 / 1000 > TIME_DIFFERENCE;

const Chat = ({ navigation }) => {
  const [messages, setMessages] = useState(sampleMessages);
  const [userId, setUserId] = useState("");
  const [messageText, setMessageText] = useState("");
  const [messagesHeight, setMessagesHeight] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const _scrollView = useRef();

  useEffect(() => {
    addKeyboardListeners();
    setUserId("nick");
  }, []);

  useEffect(() => {
    scrollTo(messagesHeight);
    addKeyboardListeners();
  }, [messagesHeight]);

  const scrollTo = (position) => {
    if (position !== null && _scrollView.current !== null) {
      _scrollView.current.scrollTo({ y: position });
    }
  };

  const handleScroll = (event) => {
    const currOffset = event.nativeEvent.contentOffset.y;
    if (currOffset < scrollOffset) {
      Keyboard.dismiss();
    }
    setScrollOffset(currOffset);
  };

  const addKeyboardListeners = () => {
    Keyboard.addListener("keyboardWillShow", (event) => {
      scrollTo(event.endCoordinates.height + messagesHeight + 100);
    });
  };

  const messageType = (message) =>
    message.senderId === userId ? "outgoing" : "incoming";

  const sendMessage = () => {
    const cleanText = messageText.trim();

    setMessages([
      ...messages,
      {
        senderId: messages.length % 2 === 0 ? "nick" : "zach",
        time: new Date(),
        text: cleanText,
      },
    ]);
    setMessageText("");
  };

  return (
    <View style={containers.parent}>
      <Header
        options
        handleOptions={() => {}}
        cancelText="back"
        handleCancel={() => navigation.goBack()}
        text="Nick Kazan"
      />
      <View
        style={[
          containers.main,
          {
            paddingTop: 0,
          },
        ]}
      >
        <ScrollView
          scrollEventThrottle={2}
          onContentSizeChange={(_, height) => setMessagesHeight(height)}
          ref={_scrollView}
          onScroll={handleScroll}
        >
          <Spacer height={16} />
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
                  type={messageType(message)}
                  text={message.text}
                />
              </View>
            ))}
        </ScrollView>
      </View>
      <KeyboardInput
        disabled={messageText.trim() === ""}
        type="action"
        onChangeText={(input) => setMessageText(input)}
        value={messageText}
        onPress={() => sendMessage()}
        style={{ marginBottom: 40 }}
        action="send"
      />
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
