/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function UserModal(props) {
    // const [userData, setUserData] = useState(null);
    const [show, setShow] = useState(true);
    const [searching, setSearching] = useState(true);
    const [accepted, setAccepted] = useState(false);
    const [rejected, setRejected] = useState(false);

    const [consent, setConsent] = useState(false);
    const [routeLink, setRoutelink] = useState('');

    const token = localStorage.getItem("user");
    const navigate = useNavigate();
    console.log('from user modal', props.userLocation);
    const search = async () => {
        try {

            const postData = {
                loc: props.userLocation,
                dest: props.destination
            };


            const response = await axios.post('http://127.0.0.1:5000/search', postData, {
                headers: {
                    'Authorization': `Bearer ${token}`,

                },
            });

            if (response.status === 200) {
                const data = response.data;
                // setUserData(data);
                // Move the console.log here to see the updated value of userData.
                console.log(data);
                // setSearching(false);

            } else {
                console.error('Unexpected status code:', response.status);
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }



    }

    const [userData, setUserData] = useState(null);
    console.log(routeLink);


    const getUserData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/id', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
            );
            if (response.status === 200) {
                const data = response.data;
                // console.log(data);
                setUserData(data);
                console.log(userData)
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const openGoogle = () => {
        window.open(routeLink, '_blank');
    };


    let searchInterval;

    const handleSearch = async () => {

        await search()

        searchInterval = setInterval(async () => {

            try {


                const response = await axios.get('http://127.0.0.1:5000/match', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200) {
                    const data = response.data;
                    // setUserData(data);
                    // Move the console.log here to see the updated value of userData.
                    console.log(data);
                    setSearching(false);
                    getUserData();
                    clearInterval(searchInterval); // Stop polling when status is 200.
                } else {
                    console.error('Unexpected status code:', response.status);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }

            // Track the time when the polling started.
            const currentTime = new Date().getTime();
            console.log("time", currentTime - startTime)
            // Check if 2 minutes have passed (120,000 milliseconds).
            if (currentTime - startTime >= 12000) {
                clearInterval(searchInterval); // Clear the interval after 2 minutes.
            }
        }, 4000); // Poll every 4 seconds.

        const startTime = new Date().getTime(); // Record the start time.

        // Clear the interval when your component unmounts to avoid memory leaks.
        return () => clearInterval(searchInterval);
    };





    const handleAccept = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/accepted', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }

            );
            if (response.status === 200) {
                const data = response.data;
                console.log(data);

                // alert('accepted');
                setAccepted(true);
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    }


    const handleClose = async () => {

        try {
            const response = await axios.get('http://127.0.0.1:5000/reject', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }

            );
            if (response.status === 200) {
                const data = response.data;
                console.log(data);

                setSearching(true);
                setAccepted(false);
                setShow(false)
                setConsent(false);
                setRoutelink('');
                clearInterval(searchInterval);
                clearInterval(pollConsent)

                // alert('rejected');

            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
        setShow(false);
        navigate('/');
        clearInterval(searchInterval);
        console.log("closed modal");
        props.setopen(false);
    }

    const handleGenerate = async () => {
        console.log('generating');
        try {
            const postData = {
                waypoint: props.userLocation,
                destination: props.destination
            };

            console.log('post', postData);
            const response = await axios.post('http://127.0.0.1:5000/route', postData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })

            if (response.status === 200) {
                setRoutelink(response.data)
                // alert(response.data)
                console.log(response.data)
            }
        }
        catch (error) {
            console.error('Error fetching user details:', error);
        }
    }

    let pollConsentId




    const pollConsent = () => {
        pollConsentId = setInterval(async () => {
            try {


                const response = await axios.get('http://127.0.0.1:5000/consent', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200) {


                    setConsent(true)
                    clearInterval(pollConsentId);
                    const data = response.data;

                    console.log(data);
                    setSearching(false);

                } else {
                    console.error('Unexpected status code:', response.status);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }

            // Track the time when the polling started.
            const currentTime = new Date().getTime();

            // Check if 2 minutes have passed (120,000 milliseconds).
            if (currentTime - startTime >= 120000) {
                clearInterval(pollConsentId); // Clear the interval after 2 minutes.
            }
        }, 4000); // Poll every 4 seconds.

        const startTime = new Date().getTime(); // Record the start time.

        // Clear the interval when your component unmounts to avoid memory leaks.
        return () => clearInterval(pollConsentId);
    };

    useEffect(() => {
        if (consent) {
            console.log('generating');
            handleGenerate();
        }
    }, [consent]);



    return (
        <>

            {searching && !accepted ? (

                <Modal show={show} onHide={handleClose} centered onShow={handleSearch} >
                    <Modal.Header closeButton>

                        <Modal.Title>
                            Searching for users

                        </Modal.Title>

                    </Modal.Header>
                    <Modal.Body>

                        Wait while we search for nearby users

                    </Modal.Body>

                </Modal>) :
                (
                    <Modal show={show} onHide={handleClose}
                        centered>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                We found a Match !
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Username: {userData ? userData.username : 'Loading...'}</p>
                            <p>Age: {userData ? userData.age : 'Loading...'}</p>
                            <p>Gender: {userData ? userData.gender : 'Loading...'}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" style={{ backgroundColor: '#FF7077' }} onClick={handleClose}>
                                Reject
                            </Button>
                            <Button variant="success" style={{ backgroundColor: '#107869' }} onClick={handleAccept}>
                                Accept
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )}

            {accepted ? (
                <Modal show={show} onHide={handleClose}
                    centered onShow={pollConsent}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Waiting for the user to accept
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ minHeight: '150px', minWidth: '500px' }}>
                        <div className='row'>
                            <div className='col-6'>
                                <p>Username: {userData ? userData.username : 'Loading...'}</p>
                                <p>Age: {userData ? userData.age : 'Loading...'}</p>
                                <p>Gender: {userData ? userData.gender : 'Loading...'}</p>
                            </div>
                            <div className='col-6'>
                                <img src="/auto.svg" alt="Your Icon" style={{
                                    width: '100px', height: '100px'
                                }} />
                            </div>
                        </div>


                    </Modal.Body>
                    {consent ? (
                        <Modal.Footer >

                            {routeLink ?
                                <Button variant="success" onClick={openGoogle} style={{ backgroundColor: '#107869' }}>
                                    Start Route
                                </Button> : null}


                        </Modal.Footer>) : null}

                </Modal>
            ) : null}


        </>
    );
}

export default UserModal;