import React, {  useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { containers, headerHeight } from "../styles/containers";
import { colors } from "../styles/colors";
import { typography } from "../styles/typography";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Input from "../components/Input";
import ColorPicker from "../components/ColorPicker";
import Button from "../components/Button";
import Icon from "../components/Icon";
import ScanModal from "../components/ScanModal";
import {
  initializeSession,
} from "../services/signal.service";

const NewContact = ({ navigation, createContact }) => {
  // They will get this info from the prekey bundle
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    color: colors.limeAccent,
  });
  const [keyScanned, setKeyScanned] = useState(null);
  const [scanModalOpen, setScanModalOpen] = useState(false);

  const handleInput = (type, input) => {
    setUserInfo({ ...userInfo, [type]: input });
  };

  const handleColor = (color) => {
    setUserInfo({ ...userInfo, color });
  };

  const onScan = (data) => {
    setScanModalOpen(false);
    setKeyScanned(data);
    const parsedData = JSON.parse(data);
    console.log(parsedData);
    setKeyScanned(data);
  };

  const confirm = async () => {
    await initializeSession(keyScanned);
    const parsedData = JSON.parse(keyScanned);
    createContact(
      parsedData.userId,
      userInfo.firstName,
      userInfo.lastName,
      userInfo.color
    );
    navigation.navigate("Home");
  };

  const isReady = () => userInfo.firstName && keyScanned;

  return (
    <>
      <View style={containers.parent}>
        <ScrollView
          style={containers.main}
          contentContainerStyle={{ paddingTop: headerHeight }}
        >
          <Input
            style={NewContactStyles.block}
            onChangeText={(input) => handleInput("firstName", input)}
            label="First name"
            value={userInfo.firstName}
            error={!userInfo.firstName && "field is mandatory"}
          />
          <Input
            style={NewContactStyles.block}
            onChangeText={(input) => handleInput("lastName", input)}
            label="Last name"
            value={userInfo.lastName}
            error={!userInfo.lastName && "field is mandatory"}
          />
          <ColorPicker color={userInfo.color} handleColor={handleColor} />
          <View style={NewContactStyles.block}>
            {keyScanned ? (
              <View style={NewContactStyles.centered}>
                <Text style={typography.detail}>connection secured</Text>
                <Icon style={{ marginLeft: 8 }} name="lock" color="light" />
              </View>
            ) : (
              <View style={NewContactStyles.centered}>
                <Text style={typography.detail}>
                  your key has not been scanned by this contact
                </Text>
                <Icon style={{ marginLeft: 8 }} name="unlock" color="light" />
              </View>
            )}
          </View>
          <View style={NewContactStyles.block}>
            <Button
              expanded
              text="scan key"
              onPress={() => setScanModalOpen(true)}
            />
          </View>
        </ScrollView>
        <Header
          text="New contact"
          cancelText="cancel"
          handleCancel={() => navigation.goBack()}
        />
        <Footer
          actionDisabled={!isReady()}
          action="save"
          handleAction={() => confirm()}
        />
      </View>
      {scanModalOpen && (
        <ScanModal onScan={onScan} closeModal={() => setScanModalOpen(false)} />
      )}
    </>
  );
};

const NewContactStyles = StyleSheet.create({
  block: {
    display: "flex",
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  centered: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NewContact;
