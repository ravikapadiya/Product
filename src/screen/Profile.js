import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
function Profile(props) {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Login')}
        style={styles.buttonStyle}
      >
        <Text style={styles.buttonTextStyle}>Login page</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50"
  },
  buttonStyle: {
    fontSize: 16,
    color: "white",
    backgroundColor: "blue",
    padding: 5,
    marginTop: 10,
    minWidth: 250,
    height: 60,
    marginHorizontal: 2
  },
  buttonTextStyle: {
    padding: 5,
    color: "white",
    textAlign: "center",
    fontSize: 22
  }
})
export default Profile