import React, { useState } from "react";
import { auth } from "../utils/firebaseConfig";
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBCard,
    MDBCardBody
} from 'mdb-react-ui-kit';
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const auth = getAuth();


    const handleLogin = async (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError({errorMessage, errorCode});
                // ..
            });
        // try {
        //     await auth.signInWithEmailAndPassword(email, password);
        // } catch (error) {
        //     setError(error.message);
        // }
    };

    return (
        <div>
            <h1>Login</h1>
            <MDBCard className='p-5 w-10'>
                <MDBCardBody>
                    <form onSubmit={handleLogin}>
                        <MDBInput className='mb-4' type='email' value={email} onChange={(e) => setEmail(e.target.value)} id='form1Example1' label='Email address' />
                        <MDBInput className='mb-4' type='password' value={password} onChange={(e) => setPassword(e.target.value)} id='form1Example2' label='Password' />

                        <MDBRow className='mb-4'>
                            <MDBCol className='d-flex justify-content-center'>
                                {/* <MDBCheckbox id='form1Example3' label='Remember me' defaultChecked /> */}
                                <Link to="/register">New user? Register here</Link>
                            </MDBCol>
                            <MDBCol>
                                <Link to="/forgot-password">Forgot Password</Link>
                            </MDBCol>
                        </MDBRow>

                        <MDBBtn type='submit' block>
                            Login
                        </MDBBtn>
                    </form>
                </MDBCardBody>
            </MDBCard>



            {/* <form onSubmit={handleLogin}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Login</button>
            </form> */}
            {error && <p>{error}</p>}
        </div>
    );
};

export default Login;
