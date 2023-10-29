import React, { useState } from "react";
import { auth } from "../utils/firebaseConfig";
import { MDBBtn, MDBCard, MDBCardBody, MDBInput } from "mdb-react-ui-kit";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            await auth.sendPasswordResetEmail(email);
            setMessage("Password reset email sent. Check your inbox.");
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div>
            <h1>Forgot Password</h1>
            <MDBCard className='p-5 w-10'>
                <MDBCardBody>
                    <form onSubmit={handleResetPassword}>
                        <MDBInput className='mb-4' type='email' value={email} onChange={(e) => setEmail(e.target.value)} id='reset-email' label='Email address' />
                        <MDBBtn type='submit' block>
                            Reset Password
                        </MDBBtn>
                    </form>
                </MDBCardBody>
            </MDBCard>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ForgotPassword;
