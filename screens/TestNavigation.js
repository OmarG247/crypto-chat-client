import React from "react";
import { View, ScrollView } from "react-native";
import { containers, headerHeight } from "../styles/containers";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Option from "../components/Option";

const TestNavigation = ({ navigation }) => {
  return (
    <View style={containers.parent}>
      <ScrollView
        contentContainerStyle={{ paddingTop: headerHeight }}
        style={containers.main}
        scrollEnabled={false}
      >
        <Option onPress={() => navigation.navigate("Home")} text="Home" />
        <Option onPress={() => navigation.navigate("Chat")} text="Chat" />
        <Option onPress={() => navigation.navigate("Welcome")} text="Welcome" />
        <Option
          onPress={() => navigation.navigate("Contacts")}
          text="Contacts"
        />
        <Option
          onPress={() => navigation.navigate("NewMessage")}
          text="New Message"
        />
        <Option
          onPress={() => navigation.navigate("NewContact")}
          text="New Contact"
        />
        <Option
          onPress={() => navigation.navigate("AppOptions")}
          text="App Options"
        />
        <Option onPress={() => navigation.navigate("Scan")} text="Scan" />
      </ScrollView>
      <Header text="Screens" />
      <Footer />
    </View>
  );
};

export default TestNavigation;
