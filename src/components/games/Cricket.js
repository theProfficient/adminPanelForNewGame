import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CricketStyle.css';

const CricketData = () => {
  const [cricketData, setCricketData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://snakeladder-c5dz.onrender.com/tables');
        setCricketData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        console.log('Error response:', error.response);
        console.log('Error message:', error.message);
      }
    };

    const fetchPeriodically = () => {
      fetchData(); // Fetch data initially

      const timer = setTimeout(fetchPeriodically, 5000); // Fetch data every 5 seconds

      return () => {
        clearTimeout(timer); // Cleanup the timer when the component unmounts
      };
    };

    fetchPeriodically();

    return () => {
      clearTimeout(fetchPeriodically); // Cleanup the timer when the component unmounts
    };
  }, []);

  if (cricketData === null) {
    return <div>Loading...</div>; // Show a loading indicator while data is being fetched
  }

  // Rest of the code

  return (
    <div>
      <table className="table">
        {/* Table content */}
      </table>
      <div className="pagination">
        {/* Pagination buttons */}
      </div>
    </div>
  );
}

export default CricketData;

