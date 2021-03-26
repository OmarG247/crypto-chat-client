import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import QRCode from "react-native-qrcode-svg";
import Fab from "./Fab";
import { colors } from "../styles/colors";
import { typography } from "../styles/typography";

const QRKeyModal = ({ cipherKey, onClose }) => {
  const content = (
    <View style={Styles.modal}>
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
    <BlurView intensity={90} tint="dark" style={Styles.modalContainer}>
      {content}
    </BlurView>
  ) : (
    <View style={Styles.modalContainer}>{content}</View>
  );
};

const Styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 6,
    backgroundColor: colors.darkSurface,
  },
  modal: {
    display: "flex",
    padding: 24,
    alignItems: "center",
  },
});

export default QRKeyModal;
