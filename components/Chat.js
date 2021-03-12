import Reac from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";
import { containers } from "../styles/containers";

const messages = [{}];

const Chat = ({}) => {
  return (
    <View style={containers.parent}>
      <Header
        options
        handleOptions={() => {}}
        cancel
        cancelText="back"
        handleCancel={() => {}}
        text="Nick Kazan"
      />
      <ScrollView style={containers.basic}></ScrollView>;
    </View>
  );
};

const Message = ({ type }) => {};

const MessageStyles = StyleSheet.create({
  container: {},
});

export default Chat;
