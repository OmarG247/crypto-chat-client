import React, {useState} from "react";
import { colors } from "./styles/colors";

const useContacts = () => {
    const [contacts, setContacts] = useState({});

    const saveMessage = (id, message) => {
        if (!contacts[id]) {
            createContact("new", "sender", id, colors.limeAccent)
        }

        setContacts(contacts => {
            const prevConversation = contacts[id].messages;
            return {
                ...contacts,
                [id]: {
                    ...contacts[id],
                    messages: [...prevConversation, message]
                }
            };
        });
    };

    const createContact = (id, firstName, lastName, color) => {
        console.log("creating contact")
        if (!contacts[id]) {
            const newContact = {
                firstName,
                lastName,
                color,
                messages: [],
            };

            setContacts(contacts => {
                return {
                    ...contacts,
                    [id]: {
                        ...newContact
                    }
                }
            });
        }
    };

    return {contacts, saveMessage, createContact}
};

export default useContacts
