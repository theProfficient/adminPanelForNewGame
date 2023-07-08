import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroImage2 from '../components/HeroImage2';
import Work from '../components/Work';

// const Games = () => {
//   const [game1Data, setGame1Data] = useState([]);
//   const [game2Data, setGame2Data] = useState([]);
//   const [game3Data, setGame3Data] = useState([]);
//   const [game4Data, setGame4Data] = useState([]);

//   useEffect(() => {
//     async function fetchGame1Data() {
//       try {
//         const response = await axios.get('API_ENDPOINT_FOR_GAME1');
//         setGame1Data(response.data);
//       } catch (error) {
//         console.error('Error fetching game1 data:', error);
//       }
//     }

//     async function fetchGame2Data() {
//       try {
//         const response = await axios.get('API_ENDPOINT_FOR_GAME2');
//         setGame2Data(response.data);
//       } catch (error) {
//         console.error('Error fetching game2 data:', error);
//       }
//     }

//     async function fetchGame3Data() {
//       try {
//         const response = await axios.get('API_ENDPOINT_FOR_GAME3');
//         setGame3Data(response.data);
//       } catch (error) {
//         console.error('Error fetching game3 data:', error);
//       }
//     }

//     async function fetchGame4Data() {
//       try {
//         const response = await axios.get('API_ENDPOINT_FOR_GAME4');
//         setGame4Data(response.data);
//       } catch (error) {
//         console.error('Error fetching game4 data:', error);
//       }
//     }

//     fetchGame1Data();
//     fetchGame2Data();
//     fetchGame3Data();
//     fetchGame4Data();
//   }, []);

//   return (
//     <div>
//       <Navbar />
//       <HeroImage2 heading="GAMES." text="some of our most recent Games" />
//       <Work game1Data={game1Data} game2Data={game2Data} game3Data={game3Data} game4Data={game4Data} />
//       <Footer />
//     </div>
//   );
// };
const Games = ()=>{
  return <div>
    <Navbar />
    <HeroImage2 heading="GAMES." text="some of our most recent Games." />
    <Work />
    <Footer />
  </div>
}

export default Games;
