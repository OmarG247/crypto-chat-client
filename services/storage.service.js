const CRYPTO_CHAT_DATA = "CRYPTO_CHAT_DATA";
const emptyData = {
  contacts: [],
};
const localData = {};

const sampleContact = {
  firstName: "",
  lastName: "",
  color: "blue",
  id: "123421",
  identityKey: "",
  messages: [],
};

export const init = () => {
  const currData = localStorage.getItem(CRYPTO_CHAT_DATA);

  if (currData) {
    localStorage.setItem(CRYPTO_CHAT_DATA, emptyData);
  } else {
    localData = currData;
  }
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

  const updatedData = { ...localData };
  localStorage.setItem(CRYPTO_CHAT_DATA, updatedData);
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
  localStorage.setItem(CRYPTO_CHAT_DATA, updatedData);
};
