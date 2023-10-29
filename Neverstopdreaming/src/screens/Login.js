import React, { useState } from "react";
import "../styles/LoginStyles.css";
import { useNavigate } from "react-router-dom";
import solarLogo from "../assets/solarLogo.png";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Login using local authentication
  const handleSubmit = (e) => {
    if (email === "21bsm054@iiitdmj.ac.in" && pass === "Qwerty@123") {
      setLoggedIn(true);
      console.log("login successful");
      navigate("/location-menu");
    }
  };

  return (
    <div className="auth-form-container">
      <img
        className="persistent_vertical"
        src={solarLogo}
        alt="Krypton Solar"
        style={{ width: "25ch" }}
      />

      <h1 style={{ marginTop: "-25px" }}>Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter Email Here"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="Enter Password here"
          id="password"
          name="password"
        />
        <button className="login-btn" type="submit">
          <ArrowForwardIcon sx={{ paddingRight: "10px" }} /> Start
        </button>
      </form>
    </div>
  );
};
