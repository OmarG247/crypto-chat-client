import React from "react";
import { View, ScrollView } from "react-native";
import { colors } from "../styles/colors";
import { containers } from "../styles/containers";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Spacer from "../components/Spacer";
import Option from "../components/Option";
import Button from "../components/Button";
import Fab from "../components/Fab";
import Input from "../components/Input";

const sampleContact = {
  name: "Nick Kazan",
  color: colors.tealSecondary,
};

const Home = ({ navigation }) => (
  <View style={containers.parent}>
    <Header
      options
      handleOptions={() => {}}
      cancelText="back"
      handleCancel={() => {
        navigation.goBack();
      }}
      text="Messages"
    />
    <ScrollView style={containers.main}>
      <Contact onPress={() => {}} newMessage contact={sampleContact} />
      <Contact onPress={() => {}} newMessage contact={sampleContact} />
      <Contact onPress={() => {}} newMessage contact={sampleContact} />
      <Contact onPress={() => {}} newMessage contact={sampleContact} />
      <Contact onPress={() => {}} newMessage contact={sampleContact} />
      <Contact onPress={() => {}} newMessage contact={sampleContact} />
      <Contact onPress={() => {}} newMessage contact={sampleContact} />
      <Spacer height={200} />
    </ScrollView>
    {/* <Option text="test" onPress={() => {}} /> */}
    {/* <Input onChangeText={() => {}} label="test" /> */}
    {/* <Button text="test" color="lime" onPress={() => {}} /> */}
    {/* <Fab action="new" color="lime" /> */}
    <Footer action="new" handleAction={() => {}} />
  </View>
);

export default Home;
