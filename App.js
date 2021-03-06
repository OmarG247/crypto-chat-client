import React from "react";
import { Platform, StatusBar } from "react-native";
import "react-native-gesture-handler";
import Home from "./components/Home";
import TestNavigation from "./components/TestNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const ANDROID_STATUSBAR_HEIGHT = 20;

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          paddingTop:
            Platform.OS === "ios"
              ? StatusBar.currentHeight + 40
              : ANDROID_STATUSBAR_HEIGHT,
        },
      }}
    >
      <Stack.Screen
        name="Test Nav"
        component={TestNavigation}
        options={{ title: "Test Nav" }}
      />
      <Stack.Screen name="Home" component={Home} options={{ title: "Home" }} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
