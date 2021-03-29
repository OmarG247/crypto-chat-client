import React, { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { containers } from "../styles/containers";
import Input from "../components/Input";
import Button from "../components/Button";
import { Auth } from 'aws-amplify';

const confirmSignUp = async (username, code) => {
    try {
      await Auth.confirmSignUp(username, code);
    } catch (error) {
        console.log('error confirming sign up', error);
    }
}

const handleSignIn = async (username, password) => {
	try {
        const user = await Auth.signIn(username, password);
    } catch (error) {
        console.log('error signing in', error);
    }
}

const ConfirmSignup = ({ navigation, route }) => {

	const [code, setCode] = useState('');
	console.log(route)

	return (
		<View>
			<Input label="Code" value={code} onChangeText={val => setCode(val)} />
			<Button text="Submit" color="lime" secondary onPress={async () => {
                await confirmSignUp(route.params.username, code)
				await handleSignIn(route.params.username, route.params.password)
                navigation.navigate('Contacts')
            }} />
		</View>
	)

}

export default ConfirmSignup;