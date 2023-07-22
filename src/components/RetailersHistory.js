import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './games/CricketStyle.css';
import { useLocation } from 'react-router-dom';

const UserHistory = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId');

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios
      .get(`https://mannualwheel.onrender.com/getData?userId=${userId}`)
      .then(response => {
        setUserData(response.data);
        console.log(response.data.balance, "i want to see balance");
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [userId]);

  if (userData === null) {
    return <div>Loading...</div>;
  }

  const balanceArray = userData.balance.split(',').map(balance => parseInt(balance));

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th className="table-header">Sr. No.</th>
            <th className="table-header">Balance</th>
          </tr>
        </thead>
        <tbody>
          {balanceArray.map((balance, index) => (
            <tr key={index}>
              <td className="table-cell">{index}</td>
              <td className="table-cell">{balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserHistory;
