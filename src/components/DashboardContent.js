import React, { useState, useEffect } from "react";
import axios from "axios";
import './games/CricketStyle.css';
import { useLocation,useNavigate } from 'react-router-dom';
// import UserHistory from './UserHistory.js';

const Dashboard = () =>  {
const navigate = useNavigate();
const location = useLocation();
const queryParams = new URLSearchParams(location.search);

const [ticketData, setTicketData] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage] = useState(12);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('https://mannualwheel.onrender.com/getAllTicketData');
      const dataArray = response.data; // Array of documents

      // Map over the array to extract and display data from each document
      const formattedData = dataArray.map((dataObject) => {
        const ticketNumbers = dataObject.Ticket_Numbers;
        const retailerId = dataObject.retailerid;

        console.log("Ticket Numbers:", ticketNumbers);
        console.log("Retailer ID:", retailerId);

        // Sort the data based on the latest created groups (assuming there's a field 'createdAt' for timestamp)
        const sortedData = dataObject.ticketData.sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime));
        console.log(sortedData, "group data");

        // Return an object containing the extracted values and sorted data
        return {
          ticketNumbers,
          retailerId,
          sortedData,
        };
      });

      // Now you have an array of objects, each containing data from each document
      setTicketData(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData(); // Initial fetch
  const interval = setInterval(fetchData, 3000); // Fetch every 2 seconds

  return () => {
    clearInterval(interval); // Clean up the interval on component unmount
  };
}, []);


const handleView = (ticketId) => {
  navigate(`/ticketData/ticket?ticketId=${ticketId}`);
};

if (ticketData.length === 0) {
  return <div>Loading...</div>;
}

const goToPreviousPage = () => {
  setCurrentPage(currentPage - 1);
};

const goToNextPage = () => {
  setCurrentPage(currentPage + 1);
};

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = ticketData.slice(indexOfFirstItem, indexOfLastItem);
const startSerialNumber = (currentPage - 1) * itemsPerPage + 1;

return (
  <div>
    <table className="table">
      <thead>
        <tr>
          <th className="table-header">Sr. No.</th>
          <th className="table-header">Ticket Number</th>
          <th className="table-header">RetailerId</th>
          <th className="table-header">View</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.map((item, index) => (
          <tr key={index}>
            <td className="table-cell">{startSerialNumber + index}</td>
            {/* Access "ticketNumbers" and "retailerId" from the object */}
            <td className="table-cell">{item.ticketNumbers}</td>
            <td className="table-cell">{item.retailerId}</td>
            <td className="table-cell">
              <button className="button userHistory-button" onClick={() => handleView(item.ticketNumbers)}>
                <i className="fas fa-eye"></i> View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <div className="pagination">
      {/* Remaining pagination code remains the same */}
    </div>
  </div>
);
};

export default Dashboard;
