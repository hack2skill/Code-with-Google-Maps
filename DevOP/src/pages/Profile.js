import React, { useContext, useEffect, useState } from "react";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";
import { MDBBtn, MDBCard, MDBCardBody, MDBContainer, MDBInput } from "mdb-react-ui-kit";
import { AuthContext } from "../components/Authentication/AuthProvider";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../components/Authentication/DataProvider";

const Profile = () => {
    const { user } = useContext(AuthContext);
    const contextData = useContext(DataContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const toast = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
        setName(contextData.name);
        setEmail(contextData.email);
        if(contextData.dob) setDob(contextData.dob);
        if(contextData.myBloodGroup) setBloodGroup(contextData.myBloodGroup);
        if(contextData.phone) setPhone(contextData.phone);
        if(contextData.address) setAddress(contextData.address);

    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await setDoc(docRef, {

                name: name,
                email: email,
                dob: dob,
                bloodGroup: bloodGroup,
                phone: phone,
                address: address,
            });
            console.log("Form data sent to Firebase Firestore with ID: ", docSnap.id);
            toast({
                title: 'Form data sent to Firebase Firestore',
                position: 'top-right',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        } catch (error) {
            console.error("Error sending form data: ", error);
            toast({
                title: 'Error sending form data',
                position: 'top-right',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    };

    return (
        <div>
            <h1>Profile</h1>
            <MDBContainer className="d-flex justify-content-center">
                <MDBCard className="p-5 w-10">
                    <MDBCardBody>
                        <form onSubmit={handleSubmit}>
                            <MDBInput className='mb-4' type='text' value={name} onChange={(e) => setName(e.target.value)} id='fullname' label='Full Name' />
                            <MDBInput className='mb-4' type='email' value={email} onChange={(e) => setEmail(e.target.value)} id='email' label='Email' />
                            <MDBInput className='mb-4' type='date' value={dob} onChange={(e) => setDob(e.target.value)} id='dob' label='Date of Birth' />
                            <MDBInput className='mb-4' type='text' value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} id='bloodGroup' label='Blood Group' />
                            <MDBInput className='mb-4' type='tel' value={phone} onChange={(e) => setPhone(e.target.value)} id='phone' label='Phone' />
                            <MDBInput className='mb-4' type='text' value={address} onChange={(e) => setAddress(e.target.value)} id='address' label='Address' />
                            <MDBBtn type="submit" block>Submit</MDBBtn>
                        </form>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </div>
    );

};

export default Profile;
