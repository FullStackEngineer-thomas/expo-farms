import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Farms from "../screens/farms";
import FarmForm from "../screens/farms/farmForm";

const Stack = createNativeStackNavigator();

const UserStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Farms" component={Farms} />
        <Stack.Screen name="FarmForm" component={FarmForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default UserStack;
