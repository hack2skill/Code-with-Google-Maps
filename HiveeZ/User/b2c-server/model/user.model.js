const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fcm_token: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
        unique: true
    },
    location_info: {
        lat: {
            type: Number
        },
        lon: {
            type: Number
        }
    },
    is_validated: {
        type: Boolean,
    },
    otp: {
        type: String,
    }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;