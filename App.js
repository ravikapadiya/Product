/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
// import Profile from "./src/screen/Profile";
// import Signup from './src/screen/Signup';
import AppRoute from './src/screen/AppRoute';
import Home from "./src/screen/Home";
import Login from "./src/screen/Login";
import Signup from './src/screen/Signup';
const Stack = createStackNavigator();


const App = () => {

  return (
    <View style={{ flex: 1, backgroundColor: 'red' }}>
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen name="AppRoute" options={{ stackAnimation: 'none' }} component={AppRoute} />
          <Stack.Screen name="Home" options={{ stackAnimation: 'none' }} component={Home} />
          <Stack.Screen name="Login" options={{ stackAnimation: 'none', headerShown: false }} component={Login} />
          <Stack.Screen name="Signup" options={{ stackAnimation: 'none', headerShown: false }} component={Signup} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
