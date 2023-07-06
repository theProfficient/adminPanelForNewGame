import "./FooterStyle.css"

import React from 'react'
import { FaHome, FaLinkedin, FaFacebook, FaInstagram, FaMailBulk, FaPhone } from "react-icons/fa"

const Footer = () => {
  return (
    <div className="footer">
        <div className="footer-container">
            <div className="left">
            <div className="location">
                <FaHome size={20} style={
            {color:"#fff" , marginRight:"2rem"}} />
           <div>
            <p> D'Souza colony, Nashik.</p>
            <p>India.</p>
           </div>
         </div>
         <div className="phone">
            <h4>
            <FaPhone size={20} style={
        {color:"#fff" , marginRight:"2rem"}} />
        +91 7030233399
            </h4>
        </div>
        <div className="email">
            <h4>
            <FaMailBulk size={20} style={
        {color:"#fff" , marginRight:"2rem"}} />
        theProficient333@gmail.com
            </h4>
        </div>
           </div>
           <div className="right">
                <h4>About Us</h4>
                <p> We are an Ultimate Guide for Starting a Multigaming Business .</p>
                <div className="social">
                    <FaInstagram size={25} style={{color:"#fff", marginRight:"1rem"}}/>
                    gmail.com
                    <FaFacebook size={25} style={{color:"#fff", marginRight:"1rem"}}/>
                    facebook
                    <FaLinkedin size={25} style={{color:"#fff", marginRight:"1rem"}}/>
                    linkedin
                </div>
            </div>
</div>
    </div>
  )}

export default Footer
