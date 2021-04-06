import React, { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { containers } from "../styles/containers";
import { effects } from "../styles/effects";
import { typography } from "../styles/typography";
import Button from "../components/Button";
import Input from "../components/Input";
import icon from "../assets/icon-color.png";
import { Auth } from "aws-amplify";
import { colors } from "../styles/colors";
import ConfirmSignUpModal from "./ConfirmSignup";

const Welcome = ({ navigation, user, login }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);
  const [code, setCode] = useState("");
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const handleRegister = async (email, username, password) => {
    const clearEmail = email.trim();
    const clearUsername = username.trim();
    const clearPassword = password.trim();

    try {
      await Auth.signUp({
        username: clearUsername,
        password: clearPassword,
        attributes: {
          email: clearEmail,
        },
      });
    } catch (err) {
      console.log("sign up err: ", err);
    }
  };

  const handleLogin = async (username, password) => {
    const clearUsername = username.trim();
    const clearPassword = password.trim();

    try {
      await Auth.signIn(clearUsername, clearPassword);
      await login();
    } catch (error) {
      console.log("error signing in", error);
    }
  };

  const confirmSignUp = async (username, code) => {
    try {
      await Auth.confirmSignUp(username, code);
      await login();
    } catch (error) {
      console.log("error confirming sign up", error);
    }
  };

  const handleSignIn = async (username, password) => {
    try {
      await Auth.signIn(username, password);
      await login();
    } catch (error) {
      console.log("error signing in", error);
    }
  };

  const inputIsValid = () =>
    username !== "" && password !== "" && password.length >= 8 && register
      ? email !== "" && !emailIsInvalid()
      : true;

  const emailIsInvalid = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email.trim() === "") {
      return "mandatory field";
    }

    if (!re.test(email)) {
      return "invalid email";
    }

    return false;
  };

  const handleCode = (val) => setCode(val);

  const handleConfirm = async () => {
    await confirmSignUp(username, code);
    await handleSignIn(username, password);
    navigation.navigate("Home");
  };

  return (
    <>
      <View style={containers.parent}>
        <View style={[containers.main, WelcomeStyles.container]}>
          <View style={[WelcomeStyles.iconContainer, effects.glow]}>
            <Image style={[WelcomeStyles.icon]} source={icon} />
          </View>
          <Text style={[typography.display, WelcomeStyles.text, effects.glow]}>
            Welcome to a new kind of security
          </Text>
          {register && (
            <Input
              style={WelcomeStyles.input}
              label="email"
              error={emailIsInvalid()}
              value={email}
              onChangeText={(val) => setEmail(val)}
            />
          )}
          <Input
            style={WelcomeStyles.input}
            label="username"
            value={username}
            error={
              username.trim() === ""
                ? "mandatory field"
                : username.trim().includes(" ")
                ? "username contains invalid characters"
                : false
            }
            onChangeText={(val) => setUsername(val)}
          />
          <Input
            style={WelcomeStyles.input}
            secure={true}
            label="password"
            value={password}
            error={
              password.trim() === ""
                ? "mandatory field"
                : password.trim().includes(" ")
                ? "password contains invalid characters"
                : password.length < 8
                ? "password is too short"
                : false
            }
            onChangeText={(val) => setPassword(val)}
          />
          <View style={WelcomeStyles.actions}>
            {register ? (
              <>
                <Text
                  style={WelcomeStyles.actionType}
                  onPress={() => setRegister(false)}
                >
                  I have an account
                </Text>
                <Button
                  text="register"
                  disabled={!inputIsValid()}
                  onPress={async () => {
                    await handleRegister(email, username, password);
                    setConfirmModalOpen(true);
                  }}
                />
              </>
            ) : (
              <>
                <Text
                  style={WelcomeStyles.actionType}
                  onPress={() => setRegister(true)}
                >
                  I'm new here
                </Text>
                <Button
                  text="login"
                  disabled={!inputIsValid()}
                  onPress={() => {
                    handleLogin(username, password);
                    navigation.navigate("Home");
                  }}
                />
              </>
            )}
          </View>
        </View>
      </View>
      {confirmModalOpen && (
        <ConfirmSignUpModal
          code={code}
          email={email}
          handleConfirm={handleConfirm}
          handleCode={handleCode}
          handleCancel={() => setConfirmModalOpen(false)}
        />
      )}
    </>
  );
};

const WelcomeStyles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingBottom: 24,
  },
  icon: {
    resizeMode: "contain",
    width: 60,
    aspectRatio: 1,
    marginBottom: -32,
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
  },
  input: {
    paddingVertical: 16,
  },
  text: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  actions: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    marginVertical: 24,
  },
  actionType: {
    ...typography.body,
    ...typography.medium,
    color: colors.limeAccent,
    ...effects.glow,
    marginRight: 12,
  },
});

export default Welcome;
