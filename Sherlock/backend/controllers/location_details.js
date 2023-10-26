const LocationRating = require('../models/location_ratings');

exports.getlocationdetails = async (req, res) => {
    const {googlePlaceId} = req.body;

    try {
        locationObject = await LocationRating.findOne({ googlePlaceId: googlePlaceId });
        if (locationObject) {
            res.status(200).json({locationObject})
        }
        else {
            res.status(200).json({ locationObject: [], message: "No object found" });
        }
    }
    catch (err) {
        res.status(500).json({ error: 'An error occurred while fetching location details', err });
    }

}