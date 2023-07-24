import "./HeroImageStyle.css";

import React from 'react'

import IntroImage from "../assets/blue2.jpg"
import { Link } from "react-router-dom";

const HeroImage = () => {
  return (
    <div className="hero">
<div className="mask">
    <img className="into-img"
    src= {IntroImage} alt="IntroImage"/>
</div>
<div className="content">
    <p>  Welcome to the admin panel.</p>
    <h1> Test project.</h1>
</div>

    </div>
  )
}

export default HeroImage