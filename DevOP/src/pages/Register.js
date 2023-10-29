import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/firebaseConfig";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const auth = getAuth();
    // const history = useHistory();
    const navigate = useNavigate();

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
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                navigate("/");
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError({errorMessage, errorCode});
                // ..
            });
        try {
            await auth.createUserWithEmailAndPassword(email, password);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>Register</h1>
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
            </MDBCard>
        </div>
    );
};

export default Register;
