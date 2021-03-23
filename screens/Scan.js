import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Camera } from "expo-camera";
import { containers } from "../styles/containers";
import { typography } from "../styles/typography";
import { effects } from "../styles/effects";
import Fab from "../components/Fab";

const Scan = ({ navigation }) => {
  const [hasPermission, setPersmission] = useState(false);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    Camera.requestPermissionsAsync().then(({ status }) => {
      setPersmission(status === "granted");
    });
  }, []);

  return (
    <View style={containers.parent}>
      {hasPermission ? (
        <Camera
          style={{ height: "100%", display: "flex", position: "relative" }}
        >
          <View
            style={{
              width: "100%",
              position: "absolute",
              paddingBottom: 84,
              display: "flex",
              alignItems: "center",
              bottom: 0,
            }}
          >
            <Text
              style={[typography.button, effects.glow, { marginBottom: 24 }]}
            >
              scan a crypto chat QR key
            </Text>
            <Fab action="cancel" secondary large onPress={() => navigation.goBack()} />
          </View>
        </Camera>
      ) : (
        <View>
          <Text>Permissions are needed to scan key codes</Text>
        </View>
      )}
    </View>
  );
};

const ScanStyles = StyleSheet.create({});

export default Scan;
