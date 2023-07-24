import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RetailersContentStyle.css";
import { useNavigate } from "react-router-dom";

const Retailers = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchAllUserData = () => {
      axios
        .get("https://mannualwheel.onrender.com/getAllUserData")
        .then((response) => {
          // Set the fetched user data to state
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    fetchAllUserData(); // Initial fetch

    const interval = setInterval(fetchAllUserData, 5000); // Fetch every 5 seconds

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, []);

  const handleView = (userId) => {
    navigate(`/retailer/RetailersHistory?userId=${userId}`);
  };

  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userData.slice(indexOfFirstItem, indexOfLastItem);
  const startSerialNumber = (currentPage - 1) * itemsPerPage + 1;

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th className="table-header">Sr. No.</th>
            <th className="table-header">RetailerId</th>
            <th className="table-header">OpeningBalance</th>
            {/* Add other table headers here */}
            <th className="table-header">View</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((user, index) => (
            <tr key={user.userId}>
              <td className="table-cell">{startSerialNumber + index}</td>
              <td className="table-cell">{user.userId}</td>
              <td className="table-cell">{user.openingBalance}</td>
              {/* Add other table cells here */}
              <td className="table-cell">
                <button
                  className="button userHistory-button"
                  onClick={() => handleView(user.userId)}
                >
                  <i className="fas fa-eye"></i> View
                </button>
              </td>
              {/* Add other table cells here */}
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
          disabled={indexOfLastItem >= userData.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Retailers;
