const express = require("express");
const bodyParser = require("body-parser");
const sendOTP = require("./sendOTP");
const { config } = require("dotenv");
const bcrypt = require('bcryptjs');
const User = require("./models/User")
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

config()

const app = express();
app.use(cors())
// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


async function main() {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
}

main().catch(err => console.log(err));


async function createHash(value) {
    const salt = await bcrypt.genSalt(10);
    const hashedValue = await bcrypt.hash(value, salt.toString());
    return hashedValue;
}

async function checkHash(value, hashedValue) {
    const isValid = await bcrypt.compare(value, hashedValue);
    return isValid;
}

async function isEmailTaken(email) {
    const user = await User.findOne({ email });
    return !!user;
}


app.get("/", (req, res) => {
    res.json({ "message": "Hello AiroMap!" })
})

app.post("/api/register", async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email })
    if (user) {
        res.json({ success: false, message: "Email already taken!" })
        return;
    }
    let otp = Math.floor(100000 + Math.random() * 900000)
    let hashedPassword = await createHash(String(password))
    let hashedOTP = await createHash(String(otp))
    const newUser = new User({ name: name.trim(), email: email.trim(), password: hashedPassword, otp: hashedOTP })
    await newUser.save()
    res.json({ success: true })
    await sendOTP(email, otp)
})

app.post("/api/verifyemail", async (req, res) => {
    const { email, otp } = req.body;
    const user = await User.findOne({ email: email });
    let hashedOTP = user.otp
    let userId = user._id.toString();
    let isValid = await checkHash(otp, hashedOTP)
    if (isValid) {
        let user = await User.updateOne({ email: email }, { "$set": { isActive: true } })
        let jwtToken = jwt.sign(userId, process.env.JWT_SECRET)
        res.json({ success: true, token: jwtToken })
    }
    else {
        res.json({ success: false, 'message': 'Invalid OTP' })
    }
})

app.post("/api/verifyuser", async (req, res) => {
    const { token } = req.headers;
    try {
        let isTokenValid = jwt.verify(token, process.env.JWT_SECRET)
        let id = jwt.decode(token, process.env.JWT_SECRET)
        let user = await User.findOne({ "_id": id })
        if (isTokenValid) {
            res.json({ userValid: true, userName: user.name })
        }
        else {
            res.json({ userValid: false })
        }
    }
    catch {
        res.json({ userValid: false })
    }
})


app.post("/api/login", async (req, res) => {
    const { email, password, isAdmin } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
        res.json({ success: false, message: "Invalid credentials" })
        return;
    }
    let hashedPassword = user.password
    let userId = user._id.toString();
    let isValid = await checkHash(password, hashedPassword)
    if (isValid) {
        if (isAdmin === true) {
            if (user.isAdmin) {
                let jwtToken = jwt.sign(userId, process.env.JWT_SECRET)
                res.json({ success: true, token: jwtToken, verified: true })
                return;
            }
            else {
                res.json({ success: false, message: "Invalid credentials" })
                return;
            }
        }
        if (!user.isActive) {
            let otp = Math.floor(100000 + Math.random() * 900000)
            let hashedOTP = await createHash(String(otp))
            res.json(({ success: true, verified: false }))
            await User.updateOne({ email: email }, { "$set": { otp: hashedOTP } })
            await sendOTP(email, otp)
            return;
        }
        let jwtToken = jwt.sign(userId, process.env.JWT_SECRET)
        res.json({ success: true, token: jwtToken, verified: true })
    }
    else {
        res.json({ success: false, message: 'Invalid credentials' })
    }
})

app.post("/api/resendotp", async (req, res) => {
    const { email } = req.body
    let user = await User.findOne({ email: email })
    if (!user) {
        res.json({ success: false, message: "User not found" })
        return;
    }
    let otp = Math.floor(100000 + Math.random() * 900000)
    const hashedOTP = await createHash(String(otp))
    await User.updateOne({ email: email }, { "$set": { otp: hashedOTP } })
    res.json({ success: true, message: "OTP has been send to your email" })
    await sendOTP(email, otp)
})



app.post("/api/verifyotp", async (req, res) => {
    const { email, otp } = req.body;
    const user = await User.findOne({ email: email });
    let hashedOTP = user.otp
    let isValid = await checkHash(otp.toString(), hashedOTP)
    if (isValid) {
        let user = await User.updateOne({ email: email }, { "$set": { isActive: true } })
        res.json({ success: true })
    }
    else {
        res.json({ success: false, message: 'Invalid OTP' })
    }
})


app.listen(3000, "0.0.0.0", () => {
    console.log("Server is running on port http://localhost:3000");
})