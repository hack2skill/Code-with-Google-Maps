import { useState, useMemo, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../src/pages/Home";
import Map from "../src/pages/Map";
import Simulation from "./pages/Simulation";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import "./App.css";

import { auth } from "./firebase";

function App() {

  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else setUserName("Not signed");
    });
  }, []);


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/simu" element={<Simulation name={userName} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
