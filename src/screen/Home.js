import firestore from '@react-native-firebase/firestore';
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from 'react';
import { FlatList, Linking, Platform, StyleSheet, View } from 'react-native';
import { Button, Card, Paragraph } from 'react-native-paper';
function Home() {
  const navigation = useNavigation();

  const [items, setItems] = useState([])
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)

  const getDetails = async () => {
    setLoading(true)
    const querySnap = await firestore().collection('ads').get()
    const result = querySnap.docs.map(docSnap => docSnap.data())
    console.log("main", result)
    setItems(result)
    setLoading(false);
  }
  useEffect(() => {
    getDetails()
    return () => {
      console.log("cleanup")
    }
  }, [])
  const openDial = (phone, contacts) => {
    if (Platform.OS === 'android') {
      Linking.openURL(`tel:${phone, contacts}`)
    }
  }

  const renderItem = ({ item }) => {

    return (
      <Card style={styles.card}>
        <Card.Title title={item.name} />
        <Card.Content>
          <Paragraph>{item.desc}</Paragraph>
          <Paragraph>{item.year}</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: item.image }} />
        <Card.Actions>
          <Button>$ {item.price}</Button>
          <Button onPress={openDial}>call sellecr</Button>
        </Card.Actions>
      </Card>

    )

  }
  return (
    <View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.phone}
        renderItem={renderItem}
        refreshing={loading}
        onRefresh={getDetails}
      />
      {/* <Modal
        visible={false}
        transparent={true}
        statusBarTranslucent
      >
        <View style={styles.containerStyle}>
          <View style={styles.indicatorViewStyle}>
            <ActivityIndicator size={'large'} color={"#000"} />
          </View>
        </View>
      </Modal> */}
    </View>
  )
}
const styles = StyleSheet.create({
  card: {
    margin: 15,
    elevation: 6,
    justifyContent: "center"

  },
  // containerStyle: {
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: 'rgba(0,0,0,0.5)',
  //   height: "100%",
  //   width: "100%"
  // },
  // indicatorViewStyle: {
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: 'yellow',
  //   borderRadius: 8,
  //   height: 140,
  //   width: 140,
  // },
})

export default Home