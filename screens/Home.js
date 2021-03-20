import React, { useEffect, useState } from "react";
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

const sampleContacts = [
  {
    name: "Bob",
    color: colors.tealSecondary,
  },
  {
    name: "Nick Kazan",
    color: colors.tealSecondary,
  },
  {
    name: "Rachel",
    color: colors.bluePrimary,
  },
  {
    name: "Susan",
    color: colors.redError,
  },
  {
    name: "Zach",
    color: colors.bluePrimary,
  },
  {
    name: "Aidan",
    color: colors.grey,
  },
];

const Home = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    setContacts(sampleContacts);
  }, []);

  return (
    <View style={containers.parent}>
      <Header
        options
        handleOptions={() => navigation.navigate("AppOptions")}
        cancelText="back"
        handleCancel={() => {
          navigation.goBack();
        }}
        text="Messages"
      />
      <ScrollView style={containers.main}>
        {contacts.map((contact, index) => (
          <Contact
            key={`contact-${index}`}
            onPress={() => {}}
            newMessage
            contact={contact}
          />
        ))}
        <Spacer height={200} />
      </ScrollView>
      <Footer action="new" handleAction={() => {}} />
    </View>
  );
};

export default Home;
