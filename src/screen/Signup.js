import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
function Signup() {
  const navigation = useNavigation();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')

  const sendData = async () => {
    if (name && email && mobile && password && cpassword) {
      let users = {
        name: name,
        email: email,
        mobile: mobile,
        password: password,
        cpassword: cpassword
      }
      await AsyncStorage.setItem("datas", JSON.stringify(users))
      alert("register Done")
      const signupuser = await AsyncStorage.getItem("datas")
      if (signupuser) {
        navigation.navigate("Login")
      }
    } else {
      alert("Please fill  Data")
    }

  }
  return (
    <View style={styles.container}>
      <View style={{ display: 'flex', flexDirection: "row", marginTop: 25, justifyContent: "center", }}>
        <Text style={styles.maintext}>Already have an Account...</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.buttonStyle}
        >
          <Text style={styles.buttonTextStyle}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textmain}>
        <TextInput placeholder='Enter Name'
          style={styles.textbox}
          onChangeText={(name) => {
            setName(name)
          }}

        >
        </TextInput>
        <TextInput placeholder='Enter Email'
          style={styles.textbox}
          onChangeText={(email) => {
            setEmail(email)
          }}

        >
        </TextInput>
        <TextInput placeholder='Enter Mobile Number'
          style={styles.textbox}
          keyboardType="numeric"
          onChangeText={(mobile) => {
            setMobile(mobile)
          }}

        >
        </TextInput>
        <TextInput placeholder='Enter Your Password'
          secureTextEntry={true}
          style={styles.textbox}
          onChangeText={(password) => {
            setPassword(password)
          }}
        >
        </TextInput>
        <TextInput placeholder='Enter Your confirm Password'
          secureTextEntry={true}
          style={styles.textbox}
          onChangeText={(cpassword) => {
            setCpassword(cpassword)
          }}
        >
        </TextInput>

        <TouchableOpacity
          style={styles.signup_header}
          onPress={sendData}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  maintext: {

    fontWeight: 'bold',
    fontSize: 16,
    textShadowColor: 'yellow',
    color: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  buttonTextStyle: {
    fontSize: 18,
    paddingLeft: 10,
    color: "red",
    fontWeight: '800'
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
    color: "white",
    textAlign: "center",
    fontSize: 22
  }
})
export default Signup