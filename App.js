import React, {useEffect, useState} from "react";
import "react-native-gesture-handler";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {loadAsync} from "expo-font";
import {colors} from "./styles/colors";
import Home from "./screens/Home";
import Chat from "./screens/Chat";
import Welcome from "./screens/Welcome";
import Contacts from "./screens/Contacts";
import NewMessage from "./screens/NewMessage";
import NewContact from "./screens/NewContact";
import AppOptions from "./screens/AppOptions";
import ConfirmSignup from "./screens/ConfirmSignup";
import {initService} from "./services/signal.service";
import { init } from "./services/storage.service";
import Amplify, {Auth} from "aws-amplify";
import awsconfig from "./crypto-chat-client/aws-exports";

const Stack = createStackNavigator();
Amplify.configure(awsconfig);

const App = () => {
    const [user, setUser] = useState(null);
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [singalInit, setSingalInit] = useState(false);

    const { messages, sendMessage } = useChat(user?.token);

    useEffect(() => {
        init();
        loadAsync({
            "DMSans-Regular": require("./assets/fonts/DMSans-Regular.ttf"),
            "DMSans-Medium": require("./assets/fonts/DMSans-Medium.ttf"),
            "DMSans-Bold": require("./assets/fonts/DMSans-Bold.ttf"),
            "SourceSansPro-Regular": require("./assets/fonts/SourceSansPro-Regular.ttf"),
            "SourceSansPro-Light": require("./assets/fonts/SourceSansPro-Light.ttf"),
        }).then(() => {
            setFontsLoaded(true);
        });
    }, []);

    useEffect(() => {
        initService().then(() => {
            setSingalInit(true);
        });
    }, []);

    useEffect(() => {
        const checkLogin = async () => {
            try {
                await Auth.currentSession();
                await login();
            } catch (e) {
                setUser(null)
            }
        };
        checkLogin()
    }, []);

    const login = async () => {
        const {signInUserSession: {accessToken: {payload}}} = await Auth.currentAuthenticatedUser();
        const token = (await Auth.currentSession()).getAccessToken().getJwtToken();
        const userId = payload.username
        setUser({
            userId,
            token,
        })
    };

    // Show login unless user is not null
    return (
        fontsLoaded &&
        singalInit && (
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                        cardStyle: {
                            backgroundColor: colors.dark,
                        },
                    }}
                >
                    <Stack.Screen name="Welcome">
                        {props => <Welcome {...props} user={user} login={login}/>}
                    </Stack.Screen>
                    <Stack.Screen name="Chat">
                        {props => <Chat {...props} user={user} messages={messages} sendMessage={sendMessage}/>}
                    </Stack.Screen>
                    <Stack.Screen name="Home">
                        {props => <Home {...props} user={user} messages={messages}/>}
                    </Stack.Screen>
                    <Stack.Screen name="Contacts" component={Contacts}/>
                    <Stack.Screen name="NewMessage">
                        {props => <NewMessage {...props} user={user}/>}
                    </Stack.Screen>
                    <Stack.Screen name="NewContact">
                        {props => <NewContact {...props} user={user}/>}
                    </Stack.Screen>
                    <Stack.Screen name="AppOptions" component={AppOptions}/>
                    <Stack.Screen name="ConfirmSignup" component={ConfirmSignup}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
    );
};

export default App;
