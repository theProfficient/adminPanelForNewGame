// type rafce for format of react function it will get filename also

import React from 'react'

import Navbar from '../components/Navbar'    // import navbar here to use component here now navbar is randering in home page and homepage is randering in app.js page
// import Footer from '../components/Footer'
import HeroImage2 from '../components/HeroImage2';
import RetailersContent from "../components/RetailersContent"



const Retailers = () => {
 
  return (
  <div>
  {/* <Navbar/>
  <HeroImage2 heading=" USERS ."text=" some of our most recent Users. "
   /> */}
  <RetailersContent/>
  {/* <Footer/> */}
  </div>
  )
};

export default Retailers;
