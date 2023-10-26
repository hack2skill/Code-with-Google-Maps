import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import Hero from "../assets/HeroResQ.svg";
import mob from "../assets/Mobile.svg";

import feat1 from "../assets/feat1.svg";
import feat2 from "../assets/feat2.svg";
import feat3 from "../assets/feat3.svg";
import feat4 from "../assets/feat4.svg";



const Home = (props) => {
  return (
    <>
      <div className="home">
        <div className="navbar flex justify-between mt-6 mx-10 poppins">
          <div className="flex">
          <img src={logo} alt="" />
          <h1 className="flex items-center mx-5"><a href="/">Home</a></h1>
          <h1 className="flex items-center mx-5"><a href="/simu">Stimulate</a></h1>
          <h1 className="flex items-center mx-5"><a href="">About</a></h1>
          <h1 className="flex items-center mx-5"><a href="">Company</a></h1>
          </div>
               
          <div className="flex">
            <Link to="/login" className="flex items-center mx-2">
              Login
            </Link>
            <Link to="/signup" className="flex items-center mx-2">
              Sign Up
            </Link>
          </div>
        </div>

        <div className="hero flex justify-between mx-10 mt-10">
          <div className="w-1/2 flex items-center justify-center poppins">
            <div>
            <h1 className="text-6xl font-semnibold tracking-wide">Enterprise Grade <br/> Hazard Response</h1>
             <p className="font-medium tracking-wider mt-4">The All-in-one Disaster management system platform curated <br/>  for effective response by Organizations for invividuals.</p>
             <div className="mt-5 bg-green-800 rounded-lg text-white w-24 py-2 text-center"><a href="/simu">Simulate</a></div>
            </div>
             
          </div>
          <div  className="w-1/2 flex justify-center">
              <img src={Hero} className="w-4/5" />
          </div>
        </div>

        <div className="features mt-20 mx-10">
          <h1 className="font-semibold text-3xl poppins">Features</h1>
          <div className="flex justify-between">
            <img src={feat1} className="w-80" />
            <img src={feat2} className="w-80" />
            <img src={feat3} className="w-80" />
            <img src={feat4} className="w-80" />
        </div>
        </div>

      <div className="service flex justify-between mx-10 mt-10">
          <div className="w-1/2 flex items-center justify-center poppins">
            <div className="">
            <h1 className="text-5xl font-semnibold tracking-wide">The Best In The Class Service For You Today!</h1>
             <p className="font-medium tracking-wider mt-4">This is a placeholder for your testimonials and what your client has to say,<br/> put them here and make sure its 100% true and meaningful.</p>
             <div className="mt-5 bg-green-800 rounded-lg text-white w-24 py-2 text-center"><a href="/simu">Simulate</a></div>
            </div>
             
          </div>
          <div  className="w-1/2 flex justify-center">
              <img src={mob} className="w-1/2" />
          </div>
      </div>


      <div className=""></div>
      </div>
    </>
  );
};

export default Home;
