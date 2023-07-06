import React from 'react';
import Navbar from '../components/Navbar';
import HeroImage2 from '../components/HeroImage2';
import Footer from '../components/Footer';
import CreateTournaments from "../components/CreateTable";

const CreateTournament = () => {
  const blueTextStyle = {
    color: 'white',
    fontSize: '30px',
    fontWeight: 'bold',
    fontFamily: 'Arial' // Add the fontFamily property here
  };

  return (
    <div>
      <Navbar/>
      <HeroImage2 text={<span style={blueTextStyle}>Introduce a new Tournament.</span>} />
      <CreateTournaments/>
      <Footer/>
    </div>
  );
}

export default CreateTournament;
