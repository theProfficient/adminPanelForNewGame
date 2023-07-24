import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../allTableStyle.css/TableDataStyle.css';
import { useLocation } from 'react-router-dom';

const UserHistory = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId');

  const [userData, setUserData] = useState(null);
  const [selectedMultiplier, setSelectedMultiplier] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [calculatedValue, setCalculatedValue] = useState(null);

  useEffect(() => {
    axios
      .get(`https://mannualwheel.onrender.com/getData?userId=${userId}`)
      .then(response => {
        setUserData(response.data);
        console.log(response.data.ticketswithQty[0], "i want to see balance");
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [userId]);

  if (userData === null) {
    return <div>Loading...</div>;
  }

  const handleNumberButtonClick = (numberValue) => {
    setSelectedNumber(numberValue);
    setCalculatedValue(null);
    const balanceIndex = userData.ticketswithQty[0][numberValue];
    console.log("Balance Index:", balanceIndex);
  };

  const handleMultiplierButtonClick = (multiplierValue) => {
    setSelectedMultiplier(multiplierValue);
    setCalculatedValue(null);
  };

  const handleOpeningBalance = () => {
    if (selectedMultiplier !== null && selectedNumber !== null) {
      const balanceIndex = userData.ticketswithQty[0][selectedNumber];
      const openingBalance = selectedMultiplier * balanceIndex;
      setCalculatedValue(openingBalance);
    }
  };
  
  const handleSaveNumber = () => {
    console.log("Selected Number:", selectedNumber);
  };
  
  const handleSaveMultiplier = () => {
    console.log("Selected Multiplier:", selectedMultiplier);
  };

  
const saveWinner = () => {
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
    background: '#3498db',
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
    background: '#1e3799',
    color: '#fff',
    border: 'none',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
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
        <button onClick={handleSaveNumber}>Save</button>
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
        <button onClick={handleSaveMultiplier}>Save</button>
        {selectedMultiplier !== null && <div style={{ color: 'white', fontFamily: 'Times New Roman' }}>Multiplier: {selectedMultiplier}</div>}
      </div>

      <button style={openingBalanceButtonStyle} onClick={handleOpeningBalance}>
      OpeningBalance
      </button>
      {calculatedValue !== null && (
        <div style={{ color: 'white', fontFamily: 'Times New Roman', fontWeight: 'bold', fontSize: '24px' }}>
          Balance: {calculatedValue}
        </div>
      )}
      <button style={openingBalanceButtonStyle} onClick={saveWinner}>
        Declare Winner
      </button>

    </div>
  );
};

export default UserHistory;
