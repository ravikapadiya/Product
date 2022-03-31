import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
function Login(props) {
  const navigation = useNavigation();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [agree, setAgree] = useState('')
  const [show, setShow] = useState(false)
  const [visible, setVisible] = useState(true)
  const [state, setState] = useState('')
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'],

      webClientId: '335114781959-tto0n72519hqu4of8bat1ub9ior1bjq7.apps.googleusercontent.com',
      offlineAccess: true,


    });
  }, [])
  const SaveValue = async () => {

    if (email === '') {
      alert('Enter the email');
    } else if (password === '') {
      alert('Enter the valid password');
    } else {

      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          navigation.navigate(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            }),
          );

        })
        .catch(error => {
          console.log(error.code);
          if (error.code === 'auth/user-not-found') {

            setError('That email address is invalid!');
          }

        });
    }

  }
  const googleSignin = async () => {

    try {
      await GoogleSignin.hasPlayServices();
      const { accessToken, idToken } = await GoogleSignin.signIn();
      console.log(idToken);
      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );
      await auth()
        .signInWithCredential(credential)
        .then(user => {
          navigation.navigate(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            }),
          );
        });
    } catch (error) {
      console.log('error', error);
    }

  }
  return (

    <View style={styles.container} >
      <View style={styles.logocontainer}>
        <Text style={{ fontSize: 50 }}>Welcome</Text>
        <Text style={styles.logotext}>Login Page</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Enter Email'
          style={styles.textbox}
          onChangeText={(email) => {
            setEmail(email)
          }}

        >
        </TextInput>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          secureTextEntry={visible}
          placeholder='password'
          style={styles.textbox}

          onChangeText={(password) => {
            setPassword(password)
          }}
        >
        </TextInput>
        <TouchableOpacity style={styles.btneye} onPress={
          () => {
            setVisible(!visible)
            setShow(!show)

          }
        }>
          <MaterialCommunityIcons
            name={show === false ? "eye-off" : 'eye-outline'}
            size={30}
            color={"black"}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={SaveValue}
        style={styles.loginbtn}
      >
        <Text style={{ color: "white", fontSize: 25 }}>Login</Text>
      </TouchableOpacity>
      <View style={{ display: 'flex', flexDirection: "row", marginTop: 25, justifyContent: "center", }}>
        <Text style={styles.maintext}>Don't have an Account?</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => navigation.navigate('Signup')}>

          <Text style={styles.buttonTextStyle}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={googleSignin}
          style={styles.googlebtn}
        >
          <Text style={{ color: "white", fontSize: 25 }}>Google signin</Text>
        </TouchableOpacity>
      </View>

    </View>


  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#364967",
  },
  logocontainer: {
    alignItems: "center",
  },
  logotext: {
    fontSize: 45,
    fontWeight: '800',
    marginBottom: 40,
    marginTop: 10,
    color: "red",
    opacity: 0.5
  },
  inputContainer: {
    width: '80%',
    backgroundColor: "gray",
    borderRadius: 25,
    height: 60,
    marginBottom: 20,
    justifyContent: "center",
    padding: 5,
  },
  textbox: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 21,
    paddingLeft: 20,
    marginHorizontal: 20
  },

  maintext: {

    fontWeight: 'bold',
    fontSize: 16,
    textShadowColor: 'yellow',
    color: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  loginbtn: {
    width: '60%',
    height: 50,
    borderRadius: 25,
    backgroundColor: "#465881",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 10

  },
  buttonTextStyle: {
    fontSize: 20,
    paddingLeft: 10,
    color: "red",
    fontWeight: '800'
  },
  btneye: {

    position: "absolute",
    right: 25,

  },
  googlebtn: {
    width: '60%',
    height: 63,
    borderRadius: 25,
    backgroundColor: "#458425",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    marginBottom: 20,
    padding: 15,

  }
})

export default Login