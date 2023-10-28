import React, { useState } from "react";
import logo from "../assets/logo.png";
import card from "../assets/card.svg";
import { auth } from "../firebase";
import logout from "../assets/logout.svg";

import Sidenav from "../components/Sidenav/Sidenav";
import Inventory from "../pages/Inventory";
import Map from "../pages/Map";
import Alert from "../pages/Alert";

const Simulation = (props) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Inventory"); // Initialize with Inventory as the default

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      history.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <div className="navbar flex flex-start mt-4 mx-14">
        <h1 className="text-2xl font-bold ">GreenSight</h1>
      </div>

      <div className="id white-box mx-10 mt-4 flex justify-between">
        <div className="flex">
          <div className="mx-8 my-4">
            <img src={logo} className="w-16" />
          </div>

          <div className="flex flex-col justify-center">
            {/* <h3 >PetroFusion Labs</h3> */}
            <h2 className="font-semibold text-xl mb-1">
              {props.name ? `${props.name}` : "Login please"}
            </h2>
            <div className="flex">
              <img src={card} className="w-8 mr-2" />
              <h3 className="text-gray-500  text-lg">
                {" "}
                <a className="font-semibold">ID:</a> 1139753123496
              </h3>
            </div>
          </div>
        </div>

        <div className="">
          <button className="mx-5 mt-10" onClick={handleLogout}>
            <a href="/">
              <img src={logout} className="w-7" />
            </a>
          </button>
        </div>
      </div>

      <div className="flex mt-6 mb-2">
        <div className="Utilities w-1/5  mx-10 ">
          <Sidenav
            selectedMenuItem={selectedMenuItem}
            handleMenuItemClick={handleMenuItemClick}
          />
        </div>

        <div className="Mapbox w-4/5">
          {/* Conditionally render the Map component */}
          {/* Conditionally render the components based on the selected menu item */}
          {selectedMenuItem === "Simulator" ? (
            <Map />
          ) : selectedMenuItem === "Inventory" ? (
            <Inventory />
          ) : (
            <Alert />
          )}
        </div>
      </div>
    </>
  );
};

export default Simulation;
