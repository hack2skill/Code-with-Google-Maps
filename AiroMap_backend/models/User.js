const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    otp: String,
    isActive: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }
})

module.exports = mongoose.model("User", UserSchema)