import React, {useState} from "react";

const useContacts = () => {
    const [contacts, setContacts] = useState({});

    const saveMessage = (id, message) => {
        if (!contacts[id]) {
            createContact("new", "sender", id, "lime")
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

    const createContact = (firstName, lastName, id, color) => {
        if (!contacts[id]) {
            const newContact = {
                firstName,
                lastName,
                color,
                id,
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
