import React, { useEffect, useState } from "react";
import { Platform, StatusBar } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { loadAsync } from "expo-font";
import { colors } from "./styles/colors";
import TestNavigation from "./components/TestNavigation";
import Home from "./components/Home";
import Chat from "./components/Chat";
import Welcome from "./components/Welcome";

const ANDROID_STATUSBAR_HEIGHT = 20;

const Stack = createStackNavigator();

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

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
    fontsLoaded && (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: {
              paddingTop: Platform.OS === "ios" ? 20 : ANDROID_STATUSBAR_HEIGHT,
              backgroundColor: colors.dark,
            },
          }}
        >
          <Stack.Screen name="TestNav" component={TestNavigation} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Welcome" component={Welcome} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  );
};

export default App;
