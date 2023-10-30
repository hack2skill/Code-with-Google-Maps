import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthProvider';
import { db } from '../../utils/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useToast } from '@chakra-ui/react';

export const DataContext = createContext();
export const DataProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [myBloodGroup, setMyBloodGroup] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    // const [error, setError] = useState("");
    const [requestUserData, setRequestUserData] = useState(false);
    const toast = useToast();

    useEffect(() => {
        if(!user) return;
        const docRef = doc(db, "users", user.uid);
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    // console.log("Document data:", docSnap.data());
                    const { dob, bloodGroup, phone, address } = docSnap.data();
                    setName(docSnap.data().name);
                    setEmail(docSnap.data().email);
                    if (dob) setDob(dob);
                    if (bloodGroup) setMyBloodGroup(bloodGroup);
                    if (phone) setPhone(phone);
                    if (address) setAddress(address);
                } else {
                    // docSnap.data() will be undefined in this case
                    console.log("No such document!");
                    toast({
                        title: 'User data not found',
                        position: 'top-right',
                        status: 'warning',
                        duration: 3000,
                        isClosable: true,
                    })
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
                toast({
                    title: 'Error getting user data',
                    position: 'top-right',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            });
        
    }, [user]);
    
    

    return (
        <DataContext.Provider value={{
            name, setName,
            email, setEmail,
            dob, setDob,
            myBloodGroup, setMyBloodGroup,
            phone, setPhone,
            address, setAddress,
            requestUserData, setRequestUserData,
        }} >
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider