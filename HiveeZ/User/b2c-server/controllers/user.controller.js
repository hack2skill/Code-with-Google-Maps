const User = require("../model/user.model");
const { getMessaging } = require("firebase-admin/messaging");

const twilio = require("twilio");
require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const generateOTP = () => {
  const digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

const registerUser = async (req, res) => {
  const { token, phone, location_info } = req.body;
  try {
    
    const newUser = new User({
      fcm_token: token,
      phone_number: phone,
      location_info: location_info,
    });

    const otp = generateOTP();
    newUser.otp = otp;
    
    await newUser.save();

    // const messageCreate = await client.messages
    //   .create({
    //     body: `Welcome to Green Sight. Your OTP is ${otp}`,
    //     from: process.env.TWILIO_PHONE_NUMBER,
    //     to: "+91" + phone,
    //   })

    // console.log(messageCreate);
    
    const message = {
      notification: {
        title: "Welcome to Green Sight",
        body: `Your OTP is ${otp}`
      },
      "webpush": {
        "headers": {
          "Urgency": "high"
        },
        "notification": {
          "requireInteraction": "true",
          "vibrate": [200, 100, 200]
        },
      },
      data: {
        otp,
        phone,
        user_id: newUser._id.toString()
      },
      token: token,
    };
    return getMessaging()
      .send(message)
      .then((response) => {
        res.status(200).json({
          message: "Successfully sent message",
          token: token,
          notification_data: message.data
        });
        console.log("Successfully sent message:", response);
      })
      .catch((error) => {
        res.status(400);
        res.send(error);
        console.log("Error sending message:", error);
      });
  } catch (err) {
    if(err.code === 11000) {
      return res.status(400).json({ message: "Phone number already registered" });
    }
    res.status(500).json({ error: err });
  }
}

const verifyOtp = async (req, res) => {
    const { otp, user_id } = req.body;
    try {
        const user = await User.findById(user_id);
        if (user.otp === otp) {
            user.is_validated = true;
            user.otp = null;
            await user.save();
            res.status(200).json({ message: "Successfully verified" });
        }
        else {
            res.status(400).json({ message: "Incorrect OTP" });
        }
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

module.exports = { registerUser, verifyOtp };