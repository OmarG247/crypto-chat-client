import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { containers, headerHeight } from "../styles/containers";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Spacer from "../components/Spacer";
import { getContacts } from "../services/storage.service";
import { useIsFocused } from "@react-navigation/native";

const Home = ({ navigation, user }) => {
  const [contacts, setContacts] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const localContacts = getContacts();
    setContacts(localContacts);
  }, [isFocused]);

  return (
    <View style={containers.parent}>
      <ScrollView
        style={containers.main}
        contentContainerStyle={{ paddingTop: headerHeight }}
      >
        {contacts.map((contact, index) => (
          <Contact
            key={`contact-${index}`}
            onPress={() =>
              navigation.navigate("Chat", { contact: contact })
            }
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
