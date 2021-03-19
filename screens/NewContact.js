import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { containers } from "../styles/containers";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Input from "../components/Input";
import ColorPicker from "../components/ColorPicker";
import Button from "../components/Button";
import { colors } from "../styles/colors";

const NewContact = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    color: colors.limeAccent,
  });

  const handleInput = (type, input) => {
    setUserInfo({ ...userInfo, [type]: input });
  };

  const handleColor = (color) => {
    setUserInfo({ ...userInfo, color });
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
        <ColorPicker color={userInfo.color} handleColor={handleColor} />
        <Button text="generate messaging key" />
      </View>
      <Footer actionDisabled={!formIsValid()} action="save" />
    </View>
  );
};

const NewContactStyles = StyleSheet.create({
  input: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
});

export default NewContact;
