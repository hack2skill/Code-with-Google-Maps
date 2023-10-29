// import React, { useState } from 'react';
// import AddReview from './review';
// import StarRating from 'react-stars'
// import { MdAccountCircle } from 'react-icons/md';

// const LocationCard = ({ routeMode, isSource, locationData }) => {

//     const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

//     return (
//         <div className="w-full mx-auto bg-white rounded-lg shadow-lg p-4 mt-4">
//             <h2 className="text-xl font-semibold">
//                 {routeMode ? (isSource ? 'Source' : 'Destination') : 'Location'} Details
//             </h2>
//             <p className="mt-2">Address: {JSON.stringify(locationData.info.formatted_address, null, 2)}</p>
//             {/* <p>Place Id: {JSON.stringify(locationData.info.place_id, null, 2)}</p> */}

//             {Array.isArray(locationData.data.locationObject) && locationData.data.locationObject.length === 0 ? (
//                 <div className="mt-4">
//                     <h2 className="text-lg font-semibold">Safety Rating details</h2>
//                     <p>Total Rating: 3</p>
//                 </div>
//             ) : (
//                 <div className="mt-4">
//                     <h2 className="text-lg font-semibold">Safety Rating details</h2>
//                     <p>Total Rating: {locationData.data.locationObject.totalRating.toFixed(2)}</p>
//                     <h3 className="text-lg font-semibold mt-4">User Reviews</h3>

//                     {locationData.data.locationObject.userReviews.map((review) => (
//                         <div>
//                             <div className="mt-4 flex items-center space-x-2" key={review._id}>
//                                 <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
//                                     <div className="w-8 h-8 bg-blue text-white rounded-full flex items-center justify-center">
//                                         <MdAccountCircle size={30} />
//                                     </div>
//                                 </div>

//                                 <div className="flex-1">
//                                     <p className="text-base font-medium">{review.userName}</p>
//                                     <p className="text-sm text-gray-500">created at {review.createdAt}</p>
//                                 </div>
//                             </div>


//                             <div className="mt-2">
//                                 <StarRating
//                                     count={5}
//                                     size={24}
//                                     color1={'#f0f0f0'}
//                                     color2={'#ffc720'} // Active star color
//                                     value={review.userRating}
//                                     edit={false} // Disable editing of the rating
//                                 />
//                             </div>
//                             <p className="mt-2">{review.userReview}</p>
//                         </div>

//                     ))}
//                 </div>
//             )}
//             <AddReview isOpen={isReviewDialogOpen} setIsOpen={setIsReviewDialogOpen} location={locationData} />
//             <button className="bg-blue-500 text-white my-2  px-4 py-2 rounded-lg" onClick={() => setIsReviewDialogOpen(true)}>Add Review</button>
//         </div>
//     );
// };

// export default LocationCard;


import React, { useState } from 'react';
import AddReview from './review';
import StarRating from 'react-stars';
import { MdAccountCircle } from 'react-icons/md';

function formatDateToDdMmYyyy(dateString) {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return "Invalid Date";
    }

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
}

const LocationCard = ({ routeMode, isSource, locationData }) => {
    const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
    const [showAllReviews, setShowAllReviews] = useState(false);

    const toggleShowAllReviews = () => {
        setShowAllReviews(!showAllReviews);
    };

    return (
        <div className="w-full mx-auto bg-white rounded-lg shadow-lg p-4 mt-4">
            <h2 className="text-xl font-semibold">
                {routeMode ? (isSource ? 'Source' : 'Destination') : 'Location'} Details
            </h2>
            <p className="mt-2">Address: {JSON.stringify(locationData.info.formatted_address, null, 2)}</p>

            {Array.isArray(locationData.data.locationObject) && locationData.data.locationObject.length === 0 ? (
                <div className="mt-4">
                    <h2 className="text-lg font-semibold">Safety Rating</h2>
                    <p>Total Rating: 3</p>
                </div>
            ) : (
                <div className="mt-4">
                    <h2 className="text-lg font-semibold">Safety Rating</h2>
                    <p>Total Rating: {locationData.data.locationObject.totalRating.toFixed(2)}</p>
                    <h3 className="text-lg font-semibold mt-4">User Reviews</h3>

                    {locationData.data.locationObject.userReviews.slice(0, showAllReviews ? undefined : 1).map((review) => (
                        <div key={review._id}>
                            <div className="mt-4 flex items-center space-x-2">
                                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                    <div className="w-8 h-8 bg-blue text-white rounded-full flex items-center justify-center">
                                        <MdAccountCircle size={30} />
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <p className="text-base text-gray-700 font-medium">{review.userName}</p>
                                    <p className="text-sm text-gray-500">created at {formatDateToDdMmYyyy(review.createdAt)}</p>
                                </div>
                            </div>

                            <div className="mt-2">
                                <StarRating
                                    count={5}
                                    size={24}
                                    color1={'#f0f0f0'}
                                    color2={'#ffc720'}
                                    value={review.userRating}
                                    edit={false}
                                />
                            </div>
                            <p className="mt-2">{review.userReview}</p>
                        </div>
                    ))}

                    {locationData.data.locationObject.userReviews.length > 1 && (
                        <div className='justify-center align-center'>
                            <button
                                className="text-blue-500 my-2 px-4 py-1 text-base font-medium rounded-lg border-2 hover:bg-gray-300"
                                onClick={toggleShowAllReviews}
                            >
                                {showAllReviews ? 'Show Less' : 'Show More'}
                            </button>
                        </div>

                    )}
                </div>
            )}
            <AddReview isOpen={isReviewDialogOpen} setIsOpen={setIsReviewDialogOpen} location={locationData} />
            <button className="bg-blue-500 text-white my-2 px-4 py-2 rounded-lg" onClick={() => setIsReviewDialogOpen(true)}>
                Add Review
            </button>
        </div>
    );
};

export default LocationCard;


