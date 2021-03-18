import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { containers } from "../styles/containers";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Input from "../components/Input";

const NewContact = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    color: null,
  });

  const handleInput = (type, input) => {
    setUserInfo({ ...userInfo, [type]: input });
  };

  const formIsValid = () => userInfo.firstName && userInfo.lastName;

  return (
    <View style={containers.parent}>
      <Header
        text="New contact"
        cancelText="cancel"
        handleCancel={() => navigation.goBack()}
      />
      <View style={containers.main}>
        <Input
          style={NewContactStyles.input}
          onChangeText={(input) => handleInput("firstName", input)}
          label="First name"
          value={userInfo.firstName}
          error={!userInfo.firstName && "field is mandatory"}
        />
        <Input
          style={NewContactStyles.input}
          onChangeText={(input) => handleInput("lastName", input)}
          label="Last name"
          value={userInfo.lastName}
          error={!userInfo.lastName && "field is mandatory"}
        />
      </View>
      <Footer actionDisabled={!formIsValid()} action="save" />
    </View>
  );
};

const NewContactStyles = StyleSheet.create({
  input: {
    paddingVertical: 16,
  },
});

export default NewContact;
