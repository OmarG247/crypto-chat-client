import React, {useState} from "react";
import {colors} from "./styles/colors";

const useContacts = () => {
    const [contacts, setContacts] = useState({});

    const saveMessage = (id, message) => {
        if (!contacts[id]) {
            createContact(id, "new", "sender", colors.limeAccent)
        }

        setContacts(contacts => {
            const prevConversation = contacts[id].messages;
            console.log(JSON.stringify(prevConversation))
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
        console.log(`creating contact ${id}`);
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

    };

    return {contacts, saveMessage, createContact}
};

export default useContacts
