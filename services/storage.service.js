const CRYPTO_CHAT_DATA = "CRYPTO_CHAT_DATA";
const emptyData = {
    contacts: [],
};
let localData = {};

const sampleContact = {
    firstName: "",
    lastName: "",
    color: "blue",
    id: "123421",
    identityKey: "",
    messages: [],
};

export const init = () => {
    localData = emptyData;
};

export const getMessages = (id) => {
    const targetContact = localData.contacts.find((contact) => contact.id === id);
    return targetContact.messages;
};

export const saveMessage = (id, message) => {
    const targetIndex = localData.contacts.findIndex(
        (contact) => contact.id === id
    );
    localData.contacts[targetIndex].messages.push(message);
};

export const createContact = (firstName, lastName, id, color) => {
    // Make sure contact doesn't already exist in localData
    const newContact = {
        firstName,
        lastName,
        color,
        id,
        messages: [],
    };

    localData.contacts.push(newContact);
};

export const verifyContactAndSaveMessage = (id, message) => {
    const targetIndex = localData.contacts.findIndex((contact) => contact.id === id);

    if (targetIndex < 0) {
        createContact("new", "sender", id, "lime")
    }
    saveMessage(id, message)
};

export const getContacts = () => localData.contacts;
