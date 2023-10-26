import React, { useState } from 'react';
import AddReview from './review';

const LocationCard = ({ routeMode, isSource, locationData }) => {

    const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

    return (
        <div className="w-full mx-auto bg-white rounded-lg shadow-lg p-4 mt-4">
            <h2 className="text-xl font-semibold">
                {routeMode ? (isSource ? 'Source' : 'Destination') : 'Location'} Details
            </h2>
            <p className="mt-2">Address: {JSON.stringify(locationData.info.formatted_address, null, 2)}</p>
            <p>Place Id: {JSON.stringify(locationData.info.place_id, null, 2)}</p>

            {Array.isArray(locationData.data.locationObject) && locationData.data.locationObject.length === 0 ? (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold">Safety Rating details</h2>
                    <p>Total Rating: 3</p>
                </div>
            ) : (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold">Safety Rating details</h2>
                    <p>Total Rating: {locationData.data.locationObject.totalRating.toFixed(2)}</p>
                    <h3 className="text-lg font-semibold mt-4">User Reviews</h3>

                    {locationData.data.locationObject.userReviews.map((review) => (
                        <div className="mt-4" key={review._id}>
                            <p>User Name: {review.userName}</p>
                            <p>User Email: {review.userEmail}</p>
                            <p>User Rating: {review.userRating}</p>
                            <p>User Review: {review.userReview}</p>
                            <p>Created At: {review.createdAt}</p>
                        </div>
                    ))}
                </div>
            )}
            <AddReview isOpen={isReviewDialogOpen} setIsOpen={setIsReviewDialogOpen} location={locationData} />
            <button className="bg-blue-500 text-white my-2  px-4 py-2 rounded-lg" onClick={() => setIsReviewDialogOpen(true)}>Add Review</button>
        </div>
    );
};

export default LocationCard;
