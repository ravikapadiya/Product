import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from 'react';
import { View } from 'react-native';

export default function AppRoute() {
  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem("data").then(user => {
      if (user) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }]
        })
      } else {
        navigation.reset({
          index: 0,
          headerLeft: null,
          routes: [{ name: 'Login' }]
        })
      }
    })
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }} />
  )
}

// export default AppRoute;