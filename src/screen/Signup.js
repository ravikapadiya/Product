import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import { useNavigation } from "@react-navigation/native";
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function Signup() {
  const navigation = useNavigation();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')
  const [show, setShow] = useState(false)
  const [visible, setVisible] = useState(true)

  const sendData = async () => {
    if (name && email && password && cpassword) {
      await auth().createUserWithEmailAndPassword(email, password)
      messaging().getToken().then(token => {
        console.log(token)
        firestore().collection('usertoken').add({
          token: token
        })
      })
        .then(() => {
          navigation.navigate(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            }),
          );
        })
        .catch(error => {

          if (error.code === 'auth/invalid-email') {
            alert('That email address is invalid!');
          }
        });
      // let users = {
      //   name: name,
      //   email: email,
      //   mobile: mobile,
      //   password: password,
      //   cpassword: cpassword
      // }
      // await AsyncStorage.setItem("datas", JSON.stringify(users))
      // alert("register Done")
      // const signupuser = await AsyncStorage.getItem("datas")
      // console.log(signupuser)
      // if (signupuser) {
      //   navigation.navigate("Login")
      // }
    } else {
      alert("Please fill  Data")
    }

  }
  return (

    <View style={styles.container}>
      < ScrollView>
        <View style={styles.regfrom}>
          <Text style={styles.headers}>Welcome</Text>
          <Text style={styles.header}>Registration</Text>
        </View>
        <View style={styles.regfrom}>
          <TextInput placeholder='Enter Name'
            underlineColorAndroid={'transparent'}
            style={styles.textinput}
            onChangeText={(name) => {
              setName(name)
            }} />
          <TextInput placeholder='Enter Email'
            style={styles.textinput}
            onChangeText={(email) => {
              setEmail(email)
            }} />
          <View>
            <TextInput placeholder='Enter Your Password'
              secureTextEntry={!show}
              style={styles.textinput}
              onChangeText={(password) => {
                setPassword(password)
              }}
            />
            <TouchableOpacity style={styles.btneye} onPress={
              () => {
                setShow(!show)
              }
            }>
              <MaterialCommunityIcons
                name={!show ? "eye-off" : 'eye-outline'}
                size={30}
                color={"black"}
              />
            </TouchableOpacity>
          </View>
          <View>

            <TextInput placeholder='Enter confirm Password'
              secureTextEntry={visible}
              style={styles.textinput}
              onChangeText={(cpassword) => {
                setCpassword(cpassword)
              }} />
            <TouchableOpacity style={styles.btneye} onPress={
              () => {
                setVisible(!visible)
              }
            }>
              <MaterialCommunityIcons
                name={visible ? "eye-off" : 'eye-outline'}
                size={30}
                color={"black"}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.signupbtn}
            onPress={sendData}>
            <Text style={{ color: "white", fontSize: 25, fontWeight: "bold" }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={{ display: 'flex', flexDirection: "row", marginTop: 25, justifyContent: "center", }}>
          <Text style={styles.maintext}>Already have an Account...</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={styles.buttonStyle}
          >
            <Text style={styles.buttonTextStyle}>Login</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#364967",
    paddingLeft: 40,
    paddingRight: 40,
  },
  regfrom: {
    alignSelf: 'stretch',
  },
  headers: {
    color: "orange",
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
    marginTop: 10
  },
  header: {
    fontSize: 25,
    color: "#fff",
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomColor: "yellow",
    borderBottomWidth: 1
  },
  textinput: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom: 30,
    color: '#fff',
    borderBottomColor: "#f8f8f8",
    borderBottomWidth: 1.5,
    fontSize: 20
  },
  signupbtn: {
    alignSelf: "stretch",
    padding: 20,
    borderRadius: 25,
    backgroundColor: "#59cbbd",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 10

  },
  btneye: {
    position: "absolute",
    right: 5,
    top: 5
  },
  maintext: {
    fontWeight: 'bold',
    fontSize: 20,
    textShadowColor: 'yellow',
    color: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  buttonTextStyle: {
    fontSize: 20,
    paddingLeft: 10,
    color: "red",
    fontWeight: '800'
  },

})
export default Signup