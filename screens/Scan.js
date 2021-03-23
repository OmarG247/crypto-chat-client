import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Camera } from "expo-camera";
import { containers } from "../styles/containers";
import { typography } from "../styles/typography";
import { effects } from "../styles/effects";
import Fab from "../components/Fab";
import { BarCodeScanner } from "expo-barcode-scanner";
import { colors } from "../styles/colors";

const Scan = ({ navigation }) => {
  const [hasPermission, setPersmission] = useState(false);
  const [scanned, setScanned] = useState(null);

  useEffect(() => {
    Camera.requestPermissionsAsync().then(({ status }) => {
      setPersmission(status === "granted");
    });
  }, []);

  useEffect(() => {
    if (scanned) {
      alert(`scanned: ${scanned}`);
      navigation.goBack();
    }
  }, [scanned]);

  const handleCodeScanned = ({ type, data }) => {
    if (type === "org.iso.QRCode") {
      setScanned(data);
    }
  };

  return (
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
              onPress={() => navigation.goBack()}
            />
          </View>
        </BarCodeScanner>
      ) : (
        <View>
          <Text>Permissions are needed to scan key codes</Text>
        </View>
      )}
    </View>
  );
};

const ScanStyles = StyleSheet.create({
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

export default Scan;
