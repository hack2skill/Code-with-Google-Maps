import React, { useState } from "react";
import "../styles/LoginStyles.css";
import { useNavigate } from "react-router-dom";
import solarLogo from "../assets/solarLogo.png";
import LockIcon from "@mui/icons-material/Lock";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Login using local authentication
  const handleSubmit = (e) => {
    if (email === "harriette_barretto@gmail.com" && pass === "12345") {
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
        alt="Ghar Ghar Solar"
        style={{ width: "25ch" }}
      />

      <h1 style={{ marginTop: "-25px" }}>Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <button className="login-btn" type="submit">
          <LockIcon sx={{ paddingRight: "10px" }} /> Login
        </button>
      </form>
    </div>
  );
};
