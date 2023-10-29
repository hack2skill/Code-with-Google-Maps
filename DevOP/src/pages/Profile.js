import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";

const Profile = () => {
    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(db, "profiles"), {
                name: name,
                dob: dob,
                bloodGroup: bloodGroup,
                phone: phone,
                address: address,
            });
            console.log("Form data sent to Firebase Firestore with ID: ", docRef.id);
        } catch (error) {
            console.error("Error sending form data: ", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <br />
            <label>
                Date of Birth:
                <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
            </label>
            <br />
            <label>
                Blood Group:
                <input type="text" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} />
            </label>
            <br />
            <label>
                Phone:
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </label>
            <br />
            <label>
                Address:
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
};

export default Profile;
