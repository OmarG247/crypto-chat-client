import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { loadAsync } from "expo-font";
import { colors } from "./styles/colors";
import TestNavigation from "./screens/TestNavigation";
import Home from "./screens/Home";
import Chat from "./screens/Chat";
import Welcome from "./screens/Welcome";
import Contacts from "./screens/Contacts";
import NewMessage from "./screens/NewMessage";
import NewContact from "./screens/NewContact";
import AppOptions from "./screens/AppOptions";
import ConfirmSignup from "./screens/ConfirmSignup";
import { initService } from "./services/signal.service";

const Stack = createStackNavigator();

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [singalInit, setSingalInit] = useState(true);

  // useEffect(() => {
  //   initService().then(() => {
  //     setSingalInit(true);
  //   });
  // }, []);

  useEffect(() => {
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
          <Stack.Screen name="TestNav" component={TestNavigation} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Contacts" component={Contacts} />
          <Stack.Screen name="NewMessage" component={NewMessage} />
          <Stack.Screen name="NewContact" component={NewContact} />
          <Stack.Screen name="AppOptions" component={AppOptions} />
          <Stack.Screen name="ConfirmSignup" component={ConfirmSignup} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  );
};

export default App;
