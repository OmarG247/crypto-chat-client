import React, { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { containers } from "../styles/containers";
import { colors } from "../styles/colors";
import Header from "../components/Header";
import Spacer from "../components/Spacer";
import KeyboardInput from "../components/KeyboardInput";
import Contact from "../components/Contact";
import { typography } from "../styles/typography";

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

const NewMessage = () => {
  const [contacts, setContacts] = useState([]);
  const [searchResults, setSearchResult] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setContacts(sampleContacts);
  }, []);

  useEffect(() => {
    searchContacts();
  }, [search]);

  const searchContacts = () => {
    const results = contacts.filter((contact) =>
      contact.name.toUpperCase().includes(search.toUpperCase())
    );
    setSearchResult(results);
  };

  return (
    <View style={containers.parent}>
      <Header cancelText="back" text="New message" />
      <View style={containers.main}>
        <KeyboardInput
          onChangeText={(input) => setSearch(input)}
          style={{ marginBottom: 8 }}
          action="search"
          onPress={() => searchContacts()}
        />
        <ScrollView style={containers.main}>
          {(searchResults.length === 0 && search === ""
            ? contacts
            : searchResults
          ).map((contact, index) => (
            <Contact key={`contact-${index}`} contact={contact} />
          ))}
          {searchResults.length === 0 && (
            <Text
              style={[typography.subtitle, { paddingLeft: 16, paddingTop: 8 }]}
            >
              No contacts found
            </Text>
          )}
          <Spacer height={200} />
        </ScrollView>
      </View>
    </View>
  );
};

export default NewMessage;
