import React from "react";
import { Platform, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import QRCode from "react-native-qrcode-svg";
import Fab from "./Fab";
import { typography } from "../styles/typography";
import { containers } from "../styles/containers";

const QRKeyModal = ({ cipherKey, onClose }) => {
  const content = (
    <View style={containers.modal}>
      <QRCode value={cipherKey} size={264} />
      <Text style={[typography.button, { marginTop: 24 }]}>
        Have your contact scan this code
      </Text>
      <Fab
        style={{ marginTop: 24 }}
        action="cancel"
        secondary
        large
        onPress={onClose}
      />
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

export default QRKeyModal;
