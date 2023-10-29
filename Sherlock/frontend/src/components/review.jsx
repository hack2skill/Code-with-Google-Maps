import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import ReactStars from 'react-stars'

const AddReview = ({ isOpen, setIsOpen, location }) => {

    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const [userName, setuserName] = useState("");
    const [userEmail, setuserEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [errorFetch, setErrorFetch] = useState("");

    const handleRating = (rate) => {
        setRating(rate)
    }

    const handleSaveReview = () => {
        if (review && rating > 0 && userName && userEmail) {
            setErrorMessage("");
            fetch("http://localhost:8000/api/v1/add_review", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ googlePlaceId: location.info.place_id, userName: userName, userEmail: userEmail, userRating: rating, userReview: review }),
            })
                .then((response) => response.json())
                .then((data) => {
                    setIsOpen(false);
                })
                .catch((error) => {
                    setErrorFetch("Error fetching details from the API");
                });
        } else {
            setErrorMessage("All fields are required");
        }

    }

    return (

        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-30" onClose={() => setIsOpen(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Add Review
                                </Dialog.Title>
                                <div className="mt-2">
                                    <div>
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            color2={'#ffd700'}
                                            onChange={handleRating}
                                        />
                                    </div>

                                    <input
                                        className='w-full border-solid border-2 border-sky-500 rounded-lg my-2 py-2 px-3 text-sm leading-5 text-gray-900 focus:ring-0 outline-none'
                                        type='text'
                                        placeholder='Name'
                                        value={userName}
                                        onChange={(e) => setuserName(e.target.value)}
                                    />
                                    <input
                                        className='w-full border-solid border-2 border-sky-500 rounded-lg mb-2 py-2 px-3 text-sm leading-5 text-gray-900 focus:ring-0 outline-none'
                                        type='email'
                                        placeholder='Email'
                                        value={userEmail}
                                        onChange={(e) => setuserEmail(e.target.value)}
                                    />

                                    <textarea
                                        className="w-full h-24 border-solid border-2 border-sky-500 rounded-lg py-2 px-3 text-sm leading-5 text-gray-900 focus:ring-0 outline-none max-h-48"
                                        placeholder='Add your review here'
                                        onChange={(e) => setReview(e.target.value)}
                                    />
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="border-solid border-2 border-sky-500 rounded-lg inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={handleSaveReview}
                                    >
                                        Submit Review
                                    </button>
                                </div>
                                <div>
                                    {errorMessage && (
                                        <div className="text-red-500 mt-2">{errorMessage}</div>
                                    )}
                                </div>
                                <div>
                                    {errorFetch && (
                                        <div className="text-red-500 mt-2">{errorFetch}</div>
                                    )}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}


export default AddReview;