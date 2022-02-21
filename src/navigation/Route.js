import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import Home from "../screen/Home";
import Login from "../screen/Login";
import Profile from "../screen/Profile";
import Signup from '../screen/Signup';
const Stack = createStackNavigator();

export default function Route() {

  const [islogin, setLogin] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      const dataGet = await AsyncStorage.getItem("data")
      if (dataGet) {
        setLogin(true)
      } else {
        setLogin(true)
      }
      console.log("hello", islogin)
    }
    return () => fetch()
  }, [])
  return (
    <NavigationContainer>
      <Stack.Navigator >
        {islogin === false ?
          <Stack.Screen name="Home" component={Home} /> :
          <>

            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Profile" component={Profile} />
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}