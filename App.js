/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import auth from '@react-native-firebase/auth';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Account from "./src/screen/Account";
import CreateAd from './src/screen/CreateAd';
import Home from "./src/screen/Home";
import Login from "./src/screen/Login";
import Signup from './src/screen/Signup';




const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();


const AuthNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" options={{ stackAnimation: 'none', headerShown: false }} component={Login} />
      <Stack.Screen name="Signup" options={{ stackAnimation: 'none', headerShown: false }} component={Signup} />

    </Stack.Navigator>
  )
}
const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = 'home'
        } else if (route.name === 'CreateAd') {
          iconName = "plus"
        } else {
          iconName = 'account'
        }
        return <View><MaterialCommunityIcons name={iconName} color={color} size={40} /></View>
      }
    })}>
      <Tab.Screen name="Home" options={{ stackAnimation: 'none' }} component={Home} />
      <Tab.Screen name="CreateAd" options={{ stackAnimation: 'none' }} component={CreateAd} />
      <Tab.Screen name="Account" options={{ stackAnimation: 'none' }} component={Account} />
    </Tab.Navigator>
  )
}

const App = () => {
  const [user, setUser] = useState('');
  useEffect(() => {

    const unsubscribe = auth().onAuthStateChanged((userExist) => {
      if (userExist) {
        setUser(userExist)
      } else {
        setUser('')
      }
    });
    return unsubscribe
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        {
          user ? <TabNavigator /> : <AuthNavigation />
        }

      </NavigationContainer>
    </View>
  );
};

export default App;
