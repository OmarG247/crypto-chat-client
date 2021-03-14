import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../styles/colors";
import { containers } from "../styles/containers";
import Contact from "./Contact";
import Footer from "./Footer";
import Header from "./Header";
import Spacer from "./Spacer";

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

const Contacts = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    setContacts(sampleContacts);
  }, []);

  return (
    <View style={containers.parent}>
      <Header
        text="Contacts"
        cancelText="back"
        handleCancel={() => navigation.goBack()}
      />
      <ScrollView style={contacts.main}>
        {contacts.map((contact, index) => (
          <Contact key={`contact-${index}`} contact={contact} />
        ))}
        <Spacer height={200} />
      </ScrollView>
      <View style={containers.main}></View>
      <Footer action="new" handleAction={() => {}} />
    </View>
  );
};

export default Contacts;
