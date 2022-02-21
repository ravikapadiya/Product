import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
function Login(props) {
  const navigation = useNavigation();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [agree, setAgree] = useState('')
  const SaveValue = async () => {
    if (email && password) {
      const loginUser = JSON.parse(await AsyncStorage.getItem("datas"))
      if (email === loginUser.email && password === loginUser.password) {
        navigation.navigate("Home")
      } else {
        alert("User not register")
      }

    } else {
      alert('Plzz fill data')
    }
    Keyboard.dismiss()
  }
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Login Page</Text>
      <View style={styles.textmain}>
        <TextInput placeholder='Enter Email'
          style={styles.textbox}
          onChangeText={(email) => {
            setEmail(email)
          }}

        >
        </TextInput>
        <TextInput placeholder='Enter Your Password'
          secureTextEntry={true}
          style={styles.textbox}
          keyboardType="numeric"
          onChangeText={(password) => {
            setPassword(password)
          }}
        >
        </TextInput>
        <TouchableOpacity
          onPress={SaveValue}
          style={styles.buttonStyle}
        >
          <Text style={styles.buttonTextStyle}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signup_header}
          onPress={() => navigation.navigate('Signup')}>

          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.textsignup}>Don't have an Account?</Text>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "skublue",
    justifyContent: "center",


  },
  textStyle: {
    fontSize: 50,
    textAlign: "center",
    color: "blue",
    fontWeight: 'bold',
  },
  textmain: {
    marginTop: 10
  },
  textbox: {
    height: 50,
    borderColor: "skyblue",
    borderWidth: 3,
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 20,
    marginTop: 20,
    fontSize: 20
  },
  buttonStyle: {
    fontSize: 16,
    color: "white",
    backgroundColor: "blue",
    padding: 5,
    marginTop: 10,
    minWidth: 250,
    height: 60,
    marginHorizontal: 80
  },
  buttonTextStyle: {
    padding: 5,
    color: "white",
    textAlign: "center",
    fontSize: 22
  },
  signup_header: {
    fontSize: 16,
    color: "white",
    backgroundColor: "blue",
    padding: 5,
    marginTop: 10,
    minWidth: 250,
    height: 60,
    marginHorizontal: 80
  },
  signupText: {
    padding: 5,
    color: "red",
    textAlign: "center",
    fontSize: 22
  },
  textsignup: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 25,
    textShadowColor: 'red',
    color: 'green',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 10,
  }
})

export default Login