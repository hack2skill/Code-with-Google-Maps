import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { auth } from "../utils/firebaseConfig";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { AuthContext } from "../components/Authentication/AuthProvider";
import { useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";
import { useToast } from "@chakra-ui/react";

const Register = () => {
    const { user } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const toast = useToast();
    const auth = getAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user])

    // const handleGoogleLogin = async () => {
    //     try {
    //         await auth.signInWithPopup(googleAuthProvider);
    //         navigate("/");
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const handleEmailSignup = async (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed up 
                // const user = userCredential.user;
                // const id = generateId();
                // const finalDoc = {
                //     name: name.toUpperCase(),
                //     email: email,
                //     userId: resp.user.uid,
                // }
                // console.log("ID", id);
                // console.log(finalDoc);
                try {
                    const docRef = await setDoc(doc(db, "users", userCredential.user.uid), {
                        name: name.toUpperCase(),
                        email: email,
                    });
                    console.log("Document written with ID: ", docRef.id);
                    toast({
                        title: 'User Registered Successfully!',
                        position: 'top-right',
                        status: 'success',
                        isClosable: true,
                        duration: 3000,
                    })
                } catch (error) {
                    console.log("Error adding document: ", error);
                    toast({
                        title: 'Error adding document!',
                        position: 'top-right',
                        status: 'error',
                        isClosable: true,
                        duration: 3000,
                    })
                }
                // db.collection("users").add(finalDoc)
                //     .then((ref) => {
                //         console.log("Document successfully written!", ref.id);
                //     })
                //     .catch((error) => {
                //         console.error("Error writing document: ", error);
                //     });

                navigate("/");
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError({ errorMessage, errorCode });
                toast({
                    title: 'Error adding document!',
                    position: 'top-right',
                    status: 'error',
                    isClosable: true,
                    duration: 3000,
                })
                // ..
            });
    };

    return (
        <div>
            <h1>Register</h1>
            <MDBContainer className='d-flex justify-content-center'>
                <MDBCard className='p-5 w-10'>
                    <MDBCardBody>
                        {/* <button onClick={handleGoogleLogin}>Sign up with Google</button> */}
                        <form onSubmit={handleEmailSignup}>
                            <MDBInput className='mb-4' type='text' value={name} onChange={(e) => setName(e.target.value)} id='fullname' label='Full Name' />
                            <MDBInput className='mb-4' type='email' value={email} onChange={(e) => setEmail(e.target.value)} id='email' label='Email address' />
                            <MDBInput className='mb-4' type='password' value={password} onChange={(e) => setPassword(e.target.value)} id='password' label='Password' />
                            <MDBRow className='mb-4'>
                                <MDBCol className='d-flex justify-content-center'>
                                    <Link to="/login">Already a user? Login</Link>
                                </MDBCol>
                                <MDBCol>
                                    <Link to="/forgot-password">Forgot Password</Link>
                                </MDBCol>
                            </MDBRow>
                            <MDBBtn type='submit' block>
                                Sign Up
                            </MDBBtn>
                            {/* <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Sign up with Email/Password</button> */}
                        </form>
                    </MDBCardBody>
                {error && <div className="alert alert-danger" role="alert">
                {error.errorMessage}
            </div>}
                </MDBCard>
            </MDBContainer>
        </div>
    );
};

export default Register;
