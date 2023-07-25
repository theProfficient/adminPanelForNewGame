import "./HeroImageStyle.css";
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import IntroImage from "../assets/blue2.jpg";

const HeroImage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");

  const handleLogout = () => {
    // Clear the login status in the browser storage and set isLoggedIn to false
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);

    // Redirect to the login page after logout
    navigate("/");
  };

  return (
    <div className="hero">
      <div className="mask">
        <img className="into-img" src={IntroImage} alt="IntroImage" />
      </div>
      <div className="content">
        <p>Welcome to the admin panel.</p>
        <h1>Test project.</h1>
        {isLoggedIn && (
          // Show the logout button only if the user is logged in
          <button
          onClick={handleLogout}
          style={{
            padding: '12px 20px',
            backgroundColor: '#ffA500', // Change to orange color (Hex code for orange)
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
         
          }}
        >
          Logout
        </button>
        
        )}
      </div>
    </div>
  );
};

export default HeroImage;
