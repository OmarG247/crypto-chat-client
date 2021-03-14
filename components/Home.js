import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../styles/colors";
import { containers } from "../styles/containers";
import Contact from "./Contact";
import Footer from "./Footer";
import Header from "./Header";
import Option from "./Option";
import Spacer from "./Spacer";
import Button from "./Button";
import Fab from "./Fab";
import Input from "./Input";

const sampleContact = {
  name: "Nick Kazan",
  color: colors.tealSecondary,
};

const Home = ({ navigation }) => (
  <View style={containers.parent}>
    <Header
      options
      handleOptions={() => {}}
      cancel
      cancelText="back"
      handleCancel={() => {
        navigation.goBack();
      }}
      text="Messages"
    />
    <ScrollView style={containers.basic}>
      <Option text="test" onPress={() => {}} />
      <Contact onPress={() => {}} newMessage contact={sampleContact} />
      <Contact onPress={() => {}} newMessage contact={sampleContact} />
      <Contact onPress={() => {}} newMessage contact={sampleContact} />
      <Contact onPress={() => {}} newMessage contact={sampleContact} />
      <Contact onPress={() => {}} newMessage contact={sampleContact} />
      <Contact onPress={() => {}} newMessage contact={sampleContact} />
      <Contact onPress={() => {}} newMessage contact={sampleContact} />
      <Spacer height={200} />
    </ScrollView>
    {/* <Input onChangeText={() => {}} label="test" /> */}
    {/* <Button text="test" color="lime" onPress={() => {}} /> */}
    {/* <Fab action="new" color="lime" /> */}
    <Footer action="new" handleAction={() => {}} />
  </View>
);

export default Home;
