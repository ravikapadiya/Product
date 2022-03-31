import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { Button, TextInput } from 'react-native-paper';
const CreateAd = () => {
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [year, setYear] = useState('')
  const [price, setPrice] = useState('')
  const [phone, setPhone] = useState('')
  const [image, setImage] = useState(null)
  const navigation = useNavigation();

  const sendNotification = () => {
    firestore().collection('usertoken').get().then(querySnap => {
      const userdevicetoken = querySnap.docs.map(docSnap => {
        return docSnap.data().token
      })
      console.log(userdevicetoken)
    })
  }
  const postData = async () => {
    sendNotification()
    if (name && desc && year && price && phone) {
      // const imageUrl = await uploadImage();

      try {
        await firestore().collection('ads')
          .add({
            name,
            desc,
            year,
            price,
            phone,
            image,
            uid: auth().currentUser.uid

          })
        alert("posted you Ad..")

      } catch (err) {
        alert("something went worng.try again")
      }
      navigation.navigate("Home")
    } else {
      alert("plzz fil Data")
    }
  }

  // const uploadImage = async () => {
  //   if (image == null) {
  //     return null;
  //   }
  //   const uploadUri = image;
  //   let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

  //   const extension = filename.split('.').pop();
  //   const name = filename.split('.').slice(0, -1).join('.');
  //   filename = name + Date.now() + '.' + extension;

  //   const storageRef = firebase.storage().ref(`event/${filename}`);
  //   const task = storageRef.putFile(uploadUri);
  //   try {
  //     await task;
  //     const url = await storageRef.getDownloadURL();
  //     return url;
  //   } catch (e) {
  //     console.log(e);
  //     return null;
  //   }
  // };
  const openCamera = () => {
    ImagePicker.openPicker({
      width: 50,
      height: 100,
      cropping: true
    }).then(async image => {
      setImage(image.path)
      let fileName = image.path.substring(image.path.lastIndexOf('/') + 1);


      const extension = fileName.split('.').pop();
      const name = fileName.split('.').slice(0, -1).join('.');
      fileName = name + Date.now() + '.' + extension;
      const reference = storage().ref("event/" + fileName);

      const task = reference.putFile(image.path);

      try {
        // const task = await reference.putFile(image.path);
        await task;
        const url = await reference.getDownloadURL();
        setImage(url)

      } catch (err) {
        console.log(err)
        return null;
      }
    });
  }

  // const openCamera = async () => {
  //   await launchImageLibrary({ quality: 0.5 }, async (fileobj) => {
  //     if (fileobj.uri == null) {
  //       return null;
  //     }
  //     const uploadUri = fileobj.uri;
  //     let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

  //     const extension = filename.split('.').pop();
  //     const name = filename.split('.').slice(0, -1).join('.');
  //     filename = name + Date.now() + '.' + extension;

  //     const storageRef = firebase.storage().ref(`event/${filename}`);
  //     const task = storageRef.putFile(uploadUri);
  //     try {
  //       await task;
  //       const url = await storageRef.getDownloadURL();
  //       console.log(url)
  //       setImage(url)
  //     } catch (e) {
  //       console.log(e);
  //       return null;
  //     }

  // const uploadTask = storage().ref().child(`/demo/${Date.now()}`).putFile(fileobj.uri)

  // uploadTask.on('state_changed',
  //   (snapshot) => {
  //     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //     if (progress == 100) { alert("uploaded") }
  //   },
  //   (error) => {
  //     alert("something went wrong")
  //   },
  //   () => {
  //     // Upload completed successfully, now we can get the download URL
  //     uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
  //       console.log(downloadURL)
  //       setImage(downloadURL)

  //     });
  //   }
  // );


  //   });
  // }

  return (
    <View style={styles.container} >
      <Text style={styles.text}>CreateAd</Text>
      <TextInput
        mode="outlined"
        label="Ad title"
        right={<TextInput.Affix text="/100" />}
        onChangeText={(name) => {
          setName(name)
        }}
      >
      </TextInput>
      <TextInput
        mode="outlined"
        label="Describe what you are selling"
        numberOfLines={3}
        multiline={true}
        onChangeText={(desc) => {
          setDesc(desc)
        }}
      >
      </TextInput>
      <TextInput
        mode="outlined"
        label="year of purchase"
        keyboardType="numeric"
        onChangeText={(year) => {
          setYear(year)
        }}
      >
      </TextInput>
      <TextInput
        mode="outlined"
        label="price in INR"
        keyboardType="numeric"
        onChangeText={(price) => {
          setPrice(price)
        }}
      >
      </TextInput>
      <TextInput
        mode="outlined"
        label="your contact Number"
        keyboardType="numeric"
        onChangeText={(phone) => {
          setPhone(phone)
        }}
      >
      </TextInput>
      <Button icon="camera" mode="contained" onPress={openCamera}>
        upload Image
      </Button>
      <Button disabled={image ? false : true} mode="contained" onPress={postData}>
        post
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
    justifyContent: "space-evenly"
  },
  text: {
    textAlign: "center",
    fontSize: 22
  }
})

export default CreateAd