import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../allTableStyle.css/TableDataStyle.css';
import { useLocation } from 'react-router-dom';

const RetailersHistory = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId');

  const [userData, setUserData] = useState(null);
  const [selectedMultiplier, setSelectedMultiplier] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [calculatedValue, setCalculatedValue] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://mannualwheel.onrender.com/getData?userId=${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Initial fetch

    const interval = setInterval(fetchData, 1000); // Fetch every 1 second (1000 milliseconds)

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, [userId]);

  if (userData === null) {
    return <div>Loading...</div>;
  }

  const handleNumberButtonClick = (numberValue) => {
    setSelectedNumber(numberValue);
    handleOpeningBalance();
  };

  const handleMultiplierButtonClick = (multiplierValue) => {
    setSelectedMultiplier(multiplierValue);
    handleOpeningBalance();
  };

  const handleOpeningBalance = () => {
    if (selectedMultiplier !== null && selectedNumber !== null) {
      const balanceIndex = userData.ticketswithQty[0][selectedNumber];
      const openingBalance = selectedMultiplier * balanceIndex;
      setCalculatedValue(openingBalance);
    }
  };

  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const multipliers = [
    { label: '1x', value: 9 },
    { label: '2x', value: 18 },
    { label: '3x', value: 27 },
  ];

  const buttonStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    padding: '8px',
    margin: '4px',
    width: '48px',
    height: '48px',
    borderRadius: '6px',
    background: 'rgb(255, 69, 0)', // Orange-red color using RGB values
    color: '#fff',
    border: 'none',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  };

  const openingBalanceButtonStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    padding: '8px',
    margin: '4px',
    width: '150px',
    borderRadius: '6px',
    background: '#2ecc71', // Change the background color to parrot green
    color: '#fff',
    border: 'none',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  };

  const handleDeclareWinner = () => {
    if (selectedMultiplier !== null && selectedNumber !== null && calculatedValue !== null) {
      const balanceIndex = userData.ticketswithQty[0][selectedNumber];
      const selectedMultiplierObject = multipliers.find(multiplier => multiplier.value === selectedMultiplier);
      const winType = selectedMultiplierObject.label; // Using the label of selected multiplier
      const winNumber = selectedNumber;

      axios
        .put(`https://mannualwheel.onrender.com/declareWinner?retailerid=${userId}&winType=${winType}&winNumber=${winNumber}`)
        .then(response => {
          console.log(response.data, "i want to see winner data");
          window.alert("Winner has been declared successfully!");
        })
        .catch(error => {
          console.error('Error declaring winner:', error);
          window.alert("Failed to declare winner!");
        });
    } else {
      window.alert("Please select a number, multiplier, and calculate the opening balance first!");
    }
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th className="table-header">Number</th>
            <th className="table-header">Balance</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(userData.ticketswithQty[0]).map(key => (
            <tr key={key}>
              <td className="table-cell" onClick={() => handleNumberButtonClick(key)}>{key}</td>
              <td className="table-cell">{userData.ticketswithQty[0][key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {numbers.map((number) => (
          <button
            key={number}
            style={buttonStyle}
            onClick={() => handleNumberButtonClick(number)}
          >
            {number}
          </button>
        ))}
        {selectedNumber !== null && <div style={{ color: 'white', fontFamily: 'Times New Roman' }}>Number: {selectedNumber}</div>}
      </div>

      <div>
        {multipliers.map((multiplier) => (
          <button
            key={multiplier.label}
            style={buttonStyle}
            onClick={() => handleMultiplierButtonClick(multiplier.value)}
          >
            {multiplier.label}
          </button>
        ))}
        {selectedMultiplier !== null && (
          <div style={{ color: 'white', fontFamily: 'Times New Roman' }}>Multiplier: {selectedMultiplier}</div>
        )}
      </div>
{/* 
      <button style={openingBalanceButtonStyle} onClick={handleOpeningBalance}>
        Calculate Opening Balance
      </button> */}
      {calculatedValue !== null && (
        <div style={{ color: 'white', fontFamily: 'Times New Roman', fontWeight: 'bold', fontSize: '24px' }}>
          Balance: {calculatedValue}
        </div>
      )}

      <button style={openingBalanceButtonStyle} onClick={handleDeclareWinner}>
        Declare Winner
      </button>
    </div>
  );
};

export default RetailersHistory;
