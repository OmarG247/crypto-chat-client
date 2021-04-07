import React, { useState } from "react";
import { Linking, View, ScrollView } from "react-native";
import { containers, headerHeight } from "../styles/containers";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Option from "../components/Option";
import { colors } from "../styles/colors";
import { Auth } from "aws-amplify";
import { generatePreKeyBundle } from "../services/signal.service";
import QRKeyModal from "../components/QRKeyModal";

const AppOptions = ({ navigation, user }) => {
  const [cipherKey, setCipherKey] = useState(null); // This should be called preKey bundle

  const generatePreKeyBundleString = () => {
    generatePreKeyBundle(user.userId).then((result) => {
      setCipherKey(result);
    });
  };

  return (
    <>
      <View style={containers.parent}>
        <ScrollView
          style={containers.main}
          contentContainerStyle={{ paddingTop: headerHeight }}
          scrollEnabled={false}
        >
          <Option
            text="Contacts"
            onPress={() => navigation.navigate("Contacts")}
          />
          <Option
            text="Create new contact"
            onPress={() => navigation.navigate("NewContact")}
          />
          <Option
            text="Generate cipher key"
            onPress={() => generatePreKeyBundleString()}
          />
          <Option text="Terms of Service" onPress={() => {}} />
          <Option
            text="About crypto chat"
            onPress={() =>
              Linking.openURL("https://omarflores.dev/crypto-chat-website/")
            }
          />
          <Option
            color={colors.redError}
            text="Logout"
            onPress={async () => {
              try {
                await Auth.signOut();
              } catch (error) {
                console.log("error signing out: ", error);
              }
              navigation.navigate("Welcome");
            }}
          />
        </ScrollView>
        <Header
          text="Options"
          cancelText="back"
          handleCancel={() => navigation.goBack()}
        />
        <Footer />
      </View>
      {!!cipherKey && (
        <QRKeyModal cipherKey={cipherKey} onClose={() => setCipherKey(null)} />
      )}
    </>
  );
};

export default AppOptions;
