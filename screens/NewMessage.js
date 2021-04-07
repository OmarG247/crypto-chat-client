import React, {useEffect, useState} from "react";
import {ScrollView, View, Text} from "react-native";
import {containers, headerHeight} from "../styles/containers";
import {colors} from "../styles/colors";
import {typography} from "../styles/typography";
import Header from "../components/Header";
import Spacer from "../components/Spacer";
import KeyboardInput from "../components/KeyboardInput";
import Contact from "../components/Contact";
import Button from "../components/Button";
import Footer from "../components/Footer";

const NewMessage = ({navigation, contacts}) => {
    const [searchResults, setSearchResult] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        searchContacts();
    }, [search]);

    const searchContacts = () => {
        const results = Object.keys(contacts).map(contactId => {
            return contacts[contactId].name.toUpperCase().includes(search.toUpperCase())
        })
    };
    setSearchResult(results);
};

return (
    <View style={containers.parent}>
        <ScrollView
            style={containers.main}
            contentContainerStyle={{paddingTop: headerHeight}}
            scrollEnabled={false}
        >
            <KeyboardInput
                type="search"
                onChangeText={(input) => setSearch(input)}
                style={{marginBottom: 8, marginTop: 16}}
            />
            <ScrollView style={[containers.main, {paddingVertical: 8}]}>
                <View style={{paddingVertical: 16, paddingHorizontal: 12}}>
                    <Button
                        text="create new contact"
                        secondary
                        expanded
                        onPress={() => navigation.navigate("NewContact")}
                    />
                </View>
                {(searchResults.length === 0 && search === ""
                        ? contacts
                        : searchResults
                ).map((contact, index) => (
                    <Contact key={`contact-${index}`} contact={contact}/>
                ))}
                {searchResults.length === 0 && search !== "" && (
                    <Text
                        style={[typography.subtitle, {paddingLeft: 16, paddingTop: 8}]}
                    >
                        No contacts found
                    </Text>
                )}
                <Spacer height={200}/>
            </ScrollView>
        </ScrollView>
        <Header
            cancelText="back"
            text="New message"
            handleCancel={() => navigation.goBack()}
        />
        <Footer/>
    </View>
);
}
;

export default NewMessage;
