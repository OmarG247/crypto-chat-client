import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { colors } from "../styles/colors";
import { containers, headerHeight } from "../styles/containers";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Spacer from "../components/Spacer";
import { getContacts } from "../services/storage.service";

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
    name: "aiden",
    color: colors.grey,
  },
  {
    name: 'Memer2',
    color: colors.redError
  },
  {
    name: 'Memer3',
    color: colors.tealSecondary
  }
];

const Home = ({ navigation, user }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const localContacts = getContacts();
    setContacts(localContacts);
  }, []);

  return (
    <View style={containers.parent}>
      <ScrollView
        style={containers.main}
        contentContainerStyle={{ paddingTop: headerHeight }}
      >
        {contacts.map((contact, index) => (
          <Contact
            key={`contact-${index}`}
            onPress={() => navigation.navigate("Chat", { contact: contact, user })}
            newMessage
            contact={contact}
          />
        ))}
        <Spacer height={200} />
      </ScrollView>
      <Header
        options
        handleOptions={() => navigation.navigate("AppOptions")}
        cancelText="back"
        handleCancel={() => {
          navigation.goBack();
        }}
        text="Messages"
      />
      <Footer action="new" handleAction={() => {}} />
    </View>
  );
};

export default Home;
