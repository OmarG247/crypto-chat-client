import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { colors } from "../styles/colors";
import { containers, headerHeight } from "../styles/containers";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Spacer from "../components/Spacer";

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
      <ScrollView
        style={containers.main}
        contentContainerStyle={{ paddingTop: headerHeight }}
      >
        {contacts.map((contact, index) => (
          <Contact key={`contact-${index}`} contact={contact} />
        ))}
        <Spacer height={200} />
      </ScrollView>
      <Header
        text="Contacts"
        cancelText="back"
        handleCancel={() => navigation.goBack()}
      />
      <Footer action="new" handleAction={() => {}} />
    </View>
  );
};

export default Contacts;
