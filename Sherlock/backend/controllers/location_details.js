const LocationRating = require('../models/location_ratings');

exports.getlocationdetails = async (req, res) => {
    const { googlePlaceId } = req.body;

    try {
        locationObject = await LocationRating.findOne({ googlePlaceId: googlePlaceId });
        if (locationObject) {
            res.status(200).json({ locationObject })
        }
        else {
            res.status(200).json({ locationObject: [], message: "No object found" });
        }
    }
    catch (err) {
        res.status(500).json({ error: 'An error occurred while fetching location details', err });
    }

}

exports.getroutesafetyscores = async (req, res) => {
    const { route_waypoints } = req.body;
    try {
        const updatedRouteWaypoints = await Promise.all(route_waypoints.map(async route => {
            const length = route.length;
            let safetyRating = 0;

            const processedWaypoints = await Promise.all(route.map(async waypoint => {
                let userReviews = [];
                let locationRatings = 3;

                try {
                    const locationObject = await LocationRating.findOne({ googlePlaceId: waypoint.google_place_id });

                    if (locationObject) {
                        locationRatings = locationObject.totalRating;
                        userReviews = locationObject.userReviews;
                    } else {
                        locationRatings = (Math.round(Math.random() * 7 + 3)) / 2;
                    }
                } catch (err) {
                    // Handle errors
                    throw new Error('An error occurred while fetching location details: ' + err);
                }

                waypoint.reviews = userReviews;
                waypoint.rating = locationRatings;

                safetyRating += locationRatings;

                return waypoint;
            }));

            safetyRating = safetyRating / length;
            const updatedRoute = { "safetyRating": safetyRating, "waypoint": processedWaypoints };
            return updatedRoute;
        }));

        res.status(200).json({ updatedRouteWaypoints });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
