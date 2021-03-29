import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { containers } from "../styles/containers";
import { effects } from "../styles/effects";
import { typography } from "../styles/typography";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Input from "../components/Input";
import icon from "../assets/icon-color.png";

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../crypto-chat-client/aws-exports';
Amplify.configure(awsconfig);

const handleRegister = async (email, username, password) => {
  try {
    const { user } = await Auth.signUp({
      username,
      password,
      attributes: {
        email
      }
    });
  console.log(user);  
  }
  catch (err) {
    console.log('sign up err: ', err)
  }
}

const handleLogin = async (username, password) => {
  try {
    const user = await Auth.signIn(username, password);
    console.log(user)
    } catch (error) {
        console.log('error signing in', error);
    }

    const token = (await Auth.currentSession()).getAccessToken().getJwtToken();
    console.log('token', token)
}

const Welcome = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [register, setRegister] = useState(true)

  return (
    <View style={containers.parent}>
      <View style={[containers.main, WelcomeStyles.container]}>
        <View style={[WelcomeStyles.iconContainer, effects.glow]}>
          <Image style={[WelcomeStyles.icon]} source={icon} />
        </View>
        <Text style={[typography.display, WelcomeStyles.text, effects.glow]}>
          Welcome to a new kind of security
        </Text>
        {/* get value from input */}
        {register ? <Input style={WelcomeStyles.input} label="email" value={email} onChangeText={val => setEmail(val)} /> : null}
        <Input style={WelcomeStyles.input} label="username" value={username} onChangeText={val => setUsername(val)} />
        <Input style={WelcomeStyles.input} secure={true} label="password" value={password} onChangeText={val => setPassword(val)} />
        <View style={WelcomeStyles.actions}>
          {register ? 
            <Button text="register" color="lime" secondary style={WelcomeStyles.button} onPress={() => {
                handleRegister(email, username, password)
                navigation.navigate('ConfirmSignup', { username: username, password: password })
            }}/> : 
            <Button text="login" color="lime" onPress={() => {
              handleLogin(username, password)
              navigation.navigate('Contacts')
            }} />
          }
        </View>
        {register ? 
          <Text style={WelcomeStyles.setRegister}>Already have an account? <Text onPress={() => setRegister(false)}>Sign In</Text></Text> : 
          <Text style={WelcomeStyles.setRegister}>Don't have an account? <Text onPress={() => setRegister(true)}>Sign Up</Text></Text>
        }
      </View>
    </View>
  );
};

const WelcomeStyles = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingBottom: 32,
  },
  icon: {
    resizeMode: "contain",
    width: 80,
    aspectRatio: 1,
    marginBottom: -20,
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
  button: {
    marginRight: 12,
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'flex-end',
    margin: 16
  },
  setRegister: {
    color: "#fff"
  }
});

export default Welcome;
