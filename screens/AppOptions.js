import React from "react";
import { Linking, View, ScrollView } from "react-native";
import { containers, headerHeight } from "../styles/containers";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Option from "../components/Option";
import { colors } from "../styles/colors";

const AppOptions = ({ navigation }) => (
  <View style={containers.parent}>
    <ScrollView
      style={containers.main}
      contentContainerStyle={{ paddingTop: headerHeight }}
      scrollEnabled={false}
    >
      <Option text="Contacts" onPress={() => navigation.navigate("Contacts")} />
      <Option
        text="Create new contact"
        onPress={() => navigation.navigate("NewContact")}
      />
      <Option text="Terms of Service" onPress={() => {}} />
      <Option
        text="About crypto chat"
        onPress={() =>
          Linking.openURL("https://omarflores.dev/crypto-chat-website/")
        }
      />
      <Option
        color={colors.redError}
        text="Logout"
        onPress={() => navigation.goBack()}
      />
    </ScrollView>
    <Header
      text="Options"
      cancelText="back"
      handleCancel={() => navigation.goBack()}
    />
    <Footer />
  </View>
);

export default AppOptions;
