const mongoose = require('mongoose');

const LocationRatingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        min: 3
    },
    googlePlaceId: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    latLong : {
        lat : {
            type: Number
        },
        long : {
            type: Number
        }
    },
    formattedAddress : {
        type: String,
    },
    totalRating : {
        type: Number,
        min: 1,
        max: 5,
        default: 2.5
    },
    ratingCount : {
        rate1 : { type: Number, default: 0},
        rate1_5 : { type: Number, default: 0},
        rate2 : { type: Number, default: 0},
        rate2_5 : { type: Number, default: 0},
        rate3 : { type: Number, default: 0},
        rate3_5 : { type: Number, default: 0},
        rate4 : { type: Number, default: 0},
        rate4_5 : { type: Number, default: 0},
        rate5 : { type: Number, default: 0},
    },
    userReviews : [
        {
            userName : {type: String, required: true},
            userEmail : {type: String, required: true},
            totalRating: {type: Number, required: true},
            userRating : {type: Number},
            sentimentRating : {type: Number},
            userReview : {type:String, default: ''},
            createdAt :{type: Date, required: true, default: Date.now}
        }
    ],
});


module.exports = mongoose.model("LocationRating", LocationRatingSchema);
