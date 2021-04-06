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

export const saveMessages = (id, messages) => {
  const targetIndex = localData.contacts.findIndex(
    (contact) => contact.id === id
  );
  localData.contacts[targetIndex].messages = messages;

  const updatedData = { ...localData };
  localData = updatedData;
};

export const createContact = (firstName, lastName, id, identityKey, color) => {
  // Make sure contact doesn't already exist in localData
  const newContact = {
    firstName,
    lastName,
    color,
    id,
    identityKey,
    messages: [],
  };

  localData.contacts.push(newContact);
  const updatedData = { ...localData };
  localData = updatedData;
};

export const getContacts = () => localData.contacts;
