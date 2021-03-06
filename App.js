import React from "react";
import MyList from "./src/screens/MyList";
import SocketList from "./src/screens/SocketList";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SelectScreen from "./src/screens/SelectScreen";
import Popup from "./src/screens/PopupScreenContainer";
import { enableScreens } from "react-native-screens";

enableScreens();

const RootStack = createStackNavigator();
const Stack = createStackNavigator();

const MainNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Select Screen" component={SelectScreen} />
    <Stack.Screen name="Local List" component={MyList} />
    <Stack.Screen name="Online List" component={SocketList} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        mode="modal"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "transparent" },
          cardOverlayEnabled: true,
          cardStyleInterpolator: ({ current: { progress } }) => ({
            cardStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
              transform: [
                {
                  translateY: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1000, 0],
                    extrapolateLeft: "clamp",
                  }),
                },
                {
                  scale: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.25, 1],
                    extrapolateLeft: "clamp",
                  }),
                },
              ],
            },
            overlayStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.25],
                extrapolate: "clamp",
              }),
            },
          }),
        }}
      >
        <RootStack.Screen name="Main" component={MainNavigator} />
        <RootStack.Screen name="Modal" component={Popup} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
