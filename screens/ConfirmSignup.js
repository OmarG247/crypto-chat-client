import React from "react";
import { View, Text, Platform } from "react-native";
import { containers } from "../styles/containers";
import Input from "../components/Input";
import { typography } from "../styles/typography";
import Fab from "../components/Fab";
import { BlurView } from "expo-blur";

const ConfirmSignupModal = ({
  email,
  handleConfirm,
  handleCode,
  code,
  handleCancel,
}) => {
  const content = (
    <View style={[containers.modal, { alignItems: "flex-start", width: 264 }]}>
      <Text style={typography.button}>enter the code sent to</Text>
      <Text style={[typography.button, { marginBottom: 24 }]}>{email}</Text>
      <Input
        error={code.trim() === "" && "please enter a code"}
        label="Code"
        value={code}
        style={{
          paddingVertical: 0,
          paddingHorizontal: 0,
          paddingBottom: 16,
          width: "100%",
        }}
        onChangeText={handleCode}
      />
      <View
        style={{
          marginTop: 24,
          display: "flex",
          flexDirection: "row",
          alignSelf: "flex-end",
        }}
      >
        <Fab secondary action="cancel" onPress={() => handleCancel()} />
        <Fab
          style={{ marginLeft: 12 }}
          action="save"
          onPress={() => handleConfirm()}
        />
      </View>
    </View>
  );

  return Platform.OS === "ios" ? (
    <BlurView intensity={90} tint="dark" style={containers.modalContainer}>
      {content}
    </BlurView>
  ) : (
    <View style={containers.modalContainer}>{content}</View>
  );
};

export default ConfirmSignupModal;
