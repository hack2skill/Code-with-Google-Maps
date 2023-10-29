import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../utils/firebaseConfig";

const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleResetPassword = async (e) => {
        e.preventDefault();

        try {
            await auth.sendPasswordResetEmail(email);
            setMessage("Check your email to reset your password");
            setError("");
        } catch (error) {
            setError(error.message);
            setMessage("");
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            <form onSubmit={handleResetPassword}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Reset Password</button>
            </form>
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
            <p>
                Remember your password? <Link to="/login">Log in</Link>
            </p>
        </div>
    );
};

export default ResetPassword;
