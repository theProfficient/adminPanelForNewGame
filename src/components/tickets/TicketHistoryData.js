import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../allTableStyle.css/TableDataStyle.css';
import { useLocation } from 'react-router-dom';

const TicketData = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const retailerId = queryParams.get('retailerId');

  const [ticketData, setticketData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  // ... Add the state and functions for edit mode and point update ...
  const [editMode, setEditMode] = useState(false);
  const [editedRowId, setEditedRowId] = useState(null);
  const [newPointValue, setNewPointValue] = useState('');

  // Define the fetchData function
  const fetchData = async () => {
    try {
      const response = await axios.get(`https://mannualwheel.onrender.com/getAllTicketData?retailerId=${retailerId}`);
      const dataArray = response.data; // Array of documents

      // Extract and format the desired fields from the ticketData array
      const formattedData = dataArray.map((dataObject) => {
        const { drawtime, drawid, retailerid, Ticket_Number, totalqty, number, qty, point, setnames, IMEIno } = dataObject.ticketData[0];
    
        // Split the comma-separated "number" field and convert each number to an array of integers
        const numbersArray = number.split(',').map(Number);
    
        return {
          drawtime,
          drawid,
          retailerid,
          Ticket_Number,
          totalqty,
          number: numbersArray, // Use the numbersArray instead of the original comma-separated string
          qty,
          point,
          setnames,
          IMEIno,
        };
      });

      setticketData(formattedData);
      console.log(formattedData, "i want to see history");
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 1000); // Fetch every 2 seconds

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, [retailerId]);

  if (ticketData === null) {
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

  // Function to handle the PUT API request
  const handleUpdatePoints = async (retailerId) => {
    try {
      // Your PUT API endpoint to update the points
      await axios.put(`https://mannualwheel.onrender.com/declareWinner`, {
        retailerId,
        newPointValue
      });

      // After successful update, fetch the data again to refresh the table
      fetchData();
      setEditMode(false);
    } catch (error) {
      console.error('Error updating points:', error);
    }
  };

  // Function to enter edit mode and set the row ID for editing
  const handleEdit = (rowId) => {
    const selectedItem = ticketData.find((item) => item.retailerid === rowId);
    if (selectedItem) {
      setEditedRowId(rowId);
      setEditMode(true);
      setNewPointValue(''); // Set the initial value of newPointValue to an empty string
    }
  };

  // Function to handle the multiplier buttons click event
  const handleMultiplierClick = (multiplierValue) => {
    setNewPointValue(multiplierValue);
  };

  // Function to handle the Save button click event
  const handleSave = (retailerId) => {
    if (newPointValue) { // Check if newPointValue is not empty
      handleUpdatePoints(retailerId);
    }
  };
// Function to handle the number button click and set the selected number to newPointValue
const handleSelectNumber = (number) => {
  const selectedNumber = parseInt(number, 10); // Convert the selected number to an integer

  if (!isNaN(selectedNumber)) {
    // Calculate the sum of the selected number from the "tickets" array for each document
    const sumOfSelectedNumber = ticketData.reduce((accumulator, item) => {
      if (!item.resultDeclared && item.tickets && item.tickets[0].hasOwnProperty(selectedNumber)) {
        return accumulator + item.tickets[0][selectedNumber];
      }
      return accumulator;
    }, 0);

    setNewPointValue(sumOfSelectedNumber.toString());
  }
};


  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th className="table-header">Sr. No.</th>
            <th className="table-header">RetailerId</th>
            <th className="table-header">TicketNumber</th>
            <th className="table-header">TotalQuantity</th>
            <th className="table-header">Number</th>
            <th className="table-header">Qty</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={item._id}>
              <td className="table-cell">{startSerialNumber + index}</td>
              <td className="table-cell">{item.retailerid}</td>
              <td className="table-cell">{item.Ticket_Number}</td>
              <td className="table-cell">{item.totalqty}</td>
              <td className="table-cell">{item.number}</td>
              <td className="table-cell">{item.qty}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          className="button"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="button"
          onClick={goToNextPage}
          disabled={indexOfLastItem >= ticketData.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TicketData;
