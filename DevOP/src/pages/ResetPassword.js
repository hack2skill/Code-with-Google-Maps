import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../utils/firebaseConfig";
import { MDBBtn, MDBCard, MDBCardBody, MDBContainer, MDBInput } from "mdb-react-ui-kit";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleResetPassword = async (e) => {
        e.preventDefault();

        try {
            await auth.sendPasswordResetEmail(password);
            setMessage("Check your email to reset your password");
            setError("");
        } catch (error) {
            setError(error.message);
            setMessage("");
        }
    };

    return (
        <div>
            <h1>Reset Password</h1>
            <MDBContainer className='d-flex justify-content-center'>
                <MDBCard className='p-5 w-10'>
                    <MDBCardBody>
                        <form onSubmit={handleResetPassword}>
                            <MDBInput className='mb-4' type='password' value={password} onChange={(e) => setPassword(e.target.value)} id='reset-password' label='Enter new password' />
                            <MDBBtn type='submit' block>
                                Reset Password
                            </MDBBtn>
                        </form>
                        <br />
                        <p>
                            Remember your password? <Link to="/login">Log in</Link>
                        </p>
                    </MDBCardBody>
                    {message && <p>{message}</p>}
                    {error && <p>{error}</p>}
                </MDBCard>
            </MDBContainer>

        </div>
    );
};

export default ResetPassword;
