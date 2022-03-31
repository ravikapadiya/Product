//import liraries
import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/native";
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// create a component
const Account = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, color: "yellow" }}>{auth().currentUser.email}</Text>
      <Text style={{ fontSize: 20, color: "white", marginTop: 30 }}>Are you sure you want to logout ?</Text>
      <TouchableOpacity
        style={styles.logout}
        onPress={() => auth().signOut()}>

        <Text style={styles.loginbtn}>Sign Out</Text>
      </TouchableOpacity>

    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  logout: {
    width: '80%',
    height: 60,
    borderRadius: 25,
    backgroundColor: "#467896",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 10
  },
  loginbtn: {
    color: "red",
    fontSize: 30,
    fontWeight: "800"

  }

});

export default Account;
