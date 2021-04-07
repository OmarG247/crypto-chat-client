import React from "react";
import {View, ScrollView} from "react-native";
import {containers, headerHeight} from "../styles/containers";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Spacer from "../components/Spacer";

const Home = ({navigation, contacts}) => {
    return (
        <View style={containers.parent}>
            <ScrollView
                style={containers.main}
                contentContainerStyle={{paddingTop: headerHeight}}
            >
                {Object.keys(contacts).map((contactId, index) => (
                    <Contact
                        key={`contact-${index}`}
                        onPress={() =>
                            navigation.navigate("Chat", {
                                contact: {
                                    id: contactId,
                                    firstname: contacts[contactId].firstname,
                                    lastname: contacts[contactId].lastname,
                                }
                            })
                        }
                        newMessage
                        contact={contacts[contactId]}
                    />
                ))}
                <Spacer height={200}/>
            </ScrollView>
            <Header
                options
                handleOptions={() => navigation.navigate("AppOptions")}
                text="Messages"
            />
            <Footer action="new" handleAction={() => {
            }}/>
        </View>
    );
};

export default Home;
