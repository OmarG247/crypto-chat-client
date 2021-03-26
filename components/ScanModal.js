import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Camera } from "expo-camera";
import { containers } from "../styles/containers";
import { typography } from "../styles/typography";
import { effects } from "../styles/effects";
import { BarCodeScanner } from "expo-barcode-scanner";
import { colors } from "../styles/colors";
import Fab from "../components/Fab";
import Button from "../components/Button";

const ScanModal = ({ onScan, closeModal }) => {
  const [hasPermission, setPersmission] = useState(false);
  const [scanned, setScanned] = useState(null);

  useEffect(() => {
    Camera.requestPermissionsAsync().then(({ status }) => {
      setPersmission(status === "granted");
    });
  }, []);

  useEffect(() => {
    if (scanned) {
      onScan(scanned);
    }
  }, [scanned]);

  const handleCodeScanned = ({ type, data }) => {
    if (type === "org.iso.QRCode" || type === 256) {
      setScanned(data);
    }
  };

  return (
    <View style={{ position: "absolute", height: "100%", width: "100%" }}>
      <View style={[containers.parent, { paddingTop: 0 }]}>
        {hasPermission ? (
          <BarCodeScanner
            onBarCodeScanned={handleCodeScanned}
            style={ScanStyles.scanner}
          >
            <View style={ScanStyles.frame} />
            <View style={ScanStyles.actionsContainer}>
              <Text
                style={[typography.button, effects.glow, { marginBottom: 24 }]}
              >
                scan a crypto chat QR key
              </Text>
              <Fab
                action="cancel"
                secondary
                large
                onPress={() => closeModal()}
              />
            </View>
          </BarCodeScanner>
        ) : (
          <View style={ScanStyles.noPermissions}>
            <Text style={[typography.button, { marginBottom: 24 }]}>
              Permissions are needed to scan key codes
            </Text>
            <Button
              style={{ alignSelf: "center", }}
              text="go back"
              onPress={() => closeModal()}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const ScanStyles = StyleSheet.create({
  noPermissions: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  scanner: {
    height: "100%",
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  frame: {
    width: "80%",
    aspectRatio: 1,
    borderColor: colors.limeAccent,
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 10,
  },
  actionsContainer: {
    width: "100%",
    position: "absolute",
    paddingBottom: 84,
    display: "flex",
    alignItems: "center",
    bottom: 0,
  },
});

export default ScanModal;
