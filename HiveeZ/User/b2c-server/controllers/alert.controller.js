const { getMessaging } = require("firebase-admin/messaging");
const Alert = require("../model/alert.model");
const User = require("../model/user.model");

const message = {
    notification: {
      title: "Alert",
      body: "This is a Test Notification",
      // image: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
    },
    "android":{
      "priority":"high"
    },
    "apns":{
      "headers":{
        "apns-priority":"5"
      }
    },
    "webpush": {
      "headers": {
        "Urgency": "high"
      },
      "notification": {
        "requireInteraction": "true",
        "icon": "https://www.freeiconspng.com/thumbs/alert-icon/alert-icon-red-11.png",
        "badge": "https://cdn4.iconfinder.com/data/icons/google-i-o-2016/512/google_firebase-2-512.png",
        "vibrate": [200, 100, 200]
      },
      "fcm_options": {
        "link": "https://www.google.com"
      }
    }
  };

  const metersToKm = (d) => {
    d = Number(d);
    var km = Math.round(d + Number.EPSILON) / 1000;
    var kmDisplay = km < 1 ? km * 1000 + "m" :  km > 1 ? km + (km === 1 ? " km" : " kms") : "";
    return kmDisplay;
  };


const createAlert = async (req, res) => {
  const { location_info, org_name, radius } = req.body;
  try {
    const newAlert = new Alert({ location_info, org_name, radius });
    await newAlert.save();
    const fcmTokens = await User.find({}, { fcm_token: 1 });
    const tokens = fcmTokens.map((user) => user.fcm_token);
    console.log(tokens);
    const messageSend = {
      ...message,
      notification: {
        title: "Alert",
        body: `An incident has happend in ${org_name}'s plant at Lat: ${location_info.lat}, Lon: ${location_info.lon}, with a radius of ${metersToKm(radius)}`
      },
      tokens: tokens,
    };
    return getMessaging()
      .sendEachForMulticast(messageSend)
      .then((response) => {
        res.status(200).json({
          message: "Successfully sent message",
        });
        console.log("Successfully sent message:", response);
      })
      .catch((error) => {
        res.status(400);
        res.send(error);
        console.log("Error sending message:", error);
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Error creating alert",
    });
  }
};

const getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({});
    console.log(alerts);
    res.status(200).json(alerts);
  }
  catch(err) {
    console.log(err);
    res.status(500).json({
      msg: "Error fetching alerts"
    })
  }
} 

module.exports = { createAlert, getAlerts };
