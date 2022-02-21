import { useNavigation } from "@react-navigation/native";
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
function Home() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Home  sdfsd Component</Text>
      <Button title='prrss me' onPress={() => navigation.navigate('Login')} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50"
  }
})

export default Home