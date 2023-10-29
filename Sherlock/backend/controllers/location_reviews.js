const LocationRating = require('../models/location_ratings');
const language = require('@google-cloud/language');

const ratingFieldMap = {
    1: 'rate1',
    1.5: 'rate1_5',
    2: 'rate2',
    2.5: 'rate2_5',
    3: 'rate3',
    3.5: 'rate3_5',
    4: 'rate4',
    4.5: 'rate4_5',
    5: 'rate5',
};

async function updateTotalRating(ratingCount) {
    let totalSum = 0;
    let totalRating = 0;

    for (const rating in ratingFieldMap) {
        totalSum += ratingCount[ratingFieldMap[rating]];
        totalRating += parseFloat(rating) * ratingCount[ratingFieldMap[rating]];
    }

    if (totalSum === 0) {
        return 2.5; // Default value if no ratings
    }

    return totalRating / totalSum;
}

const areaSafetyRatings = {};

async function safety_score(text) {
    const client = new language.LanguageServiceClient({
        keyFile: "../backend/sentiment-analysis-402517-f2e5d7c9cdd8.json"
    });

    const document = {
        content: text,
        type: 'PLAIN_TEXT',
    };

    const [result] = await client.analyzeSentiment({ document: document });
    const sentiment = result.documentSentiment;

    const score = Math.floor((sentiment.score + 1) * 4.5 + 1);

    return score/2;
}

exports.addreview = async (req, res) => {
    const { userName, userEmail } = req.body;
    const { userRating, userReview } = req.body;
    const { googlePlaceId } = req.body;
    
    sentimentRating = await safety_score(userReview);
    console.log("sentimentRating", sentimentRating)
    //sentimentRating = 2.5;
    totalRating = Math.floor((userRating*2 + sentimentRating*2) / 2)/2;

    try {
        locationObject = await LocationRating.findOne({ googlePlaceId: googlePlaceId })

        const newUserReview = {
            userName: userName,
            userEmail: userEmail,
            totalRating: totalRating,
            userRating: userRating,
            sentimentRating: sentimentRating,
            userReview: userReview,
            createdAt: new Date(),
        };

        if (locationObject) {
            locationObject.userReviews.push(newUserReview);
            locationObject.ratingCount[ratingFieldMap[totalRating]] = (locationObject.ratingCount[ratingFieldMap[totalRating]] || 0) + 1;
            locationObject.totalRating = await updateTotalRating(locationObject.ratingCount);

            await locationObject.save();

            res.status(200).json({ message: 'User review added successfully', locationObject });
        }
        else {

            const { locationName, latLong, formattedAddress } = req.body;
            locationObject = new LocationRating({
                name: locationName,
                latLong: latLong,
                googlePlaceId: googlePlaceId,
                formattedAddress: formattedAddress,
                ratingCount: {},
                userReviews: [newUserReview]
            })
            locationObject.ratingCount[ratingFieldMap[totalRating]] = 1;
            locationObject.totalRating = totalRating;

            await locationObject.save();

            res.status(200).json({ message: 'User review added successfully and Location Object Created', locationObject });
        }

    } catch (err) {
        res.status(500).json({ error: 'An error occurred while adding or updating the review' });
        console.log(err);
    }

}

exports.getreviews = async (req, res) => {
    const {googlePlaceId} = req.body;

    try {
        locationObject = await LocationRating.findOne({ googlePlaceId: googlePlaceId });
        if (locationObject) {
            res.status(200).json({ reviews: locationObject.userReviews })
        }
        else {
            res.status(200).json({ reviews: [], message: "No reviews found" });
        }
    }
    catch (err) {
        res.status(500).json({ error: 'An error occurred while fetching reviews', err });
    }

}

// sentiment analysis api