const admin = require('firebase-admin')
const express = require('express')
const app = express()

var serviceAccount = require("./olxproduct-d93db-firebase-adminsdk-708t9-8503c3e20d.json");
app.use(express.json())
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.post('/send-noti', (req, res) => {
  console.log(req.body)
  // const message = {
  //   notification: {
  //     title: "new ad",
  //     body: "new ad posted click to open"
  //   },
  //   token: ' c6gozDtsR765VPsdei2bzt:APA91bHwZIoIljceHCGdiRTqWIdh32viv21B7U2KOixB7VQzK5B08Yi0NAsiSFGasR5T-kqY0C7Zj8AFZk6CMHFXgEGF1Ermx3Hvv673FhmVo0CY6AFz1p0y-vGhs7ZEj3wcdL_qP-RL'
  // }

  // admin.messaging().send(message).then(res => {
  //   console.log('send success')
  // }).catch(err => {
  //   console.log(err)
  // })
})
app.listen(3000, () => {
  console.log("surver running")
})
