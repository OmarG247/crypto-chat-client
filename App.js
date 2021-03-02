import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import styled from "styled-components";

const Container = styled.View`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function App() {
  const [message, setMessage] = useState("");
  let socket = null;

  useEffect(() => {});

  useEffect(() => {
    socket = new WebSocket("ws://192.168.1.21:8080");
    socket.addEventListener("open", (event) => {
      socket.send("Hello Server!");
    });

    socket.addEventListener("message", (event) => {
      console.log("Message from server ", event.data);
    });

    socket.addEventListener("close", (event) => {
      console.log("The connection has been closed");
    });
  });

  const emmitMessage = () => {
    socket.send(message);
  };

  return (
    <Container>
      <TextInput
        style={{ height: 20 }}
        onChangeText={(text) => setMessage(text)}
      ></TextInput>
      <Button onPress={() => emmitMessage()} title="send message"></Button>
    </Container>
  );
}
