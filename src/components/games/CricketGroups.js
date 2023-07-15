import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CricketStyle.css';
import { useLocation,useNavigate } from 'react-router-dom';

const CricketGroups = () => {
    const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [groupData, setGroupData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    axios
      .get('https://snakeladder1.azurewebsites.net/getAllGroups')
      .then(response => {
        setGroupData(response.data);
        console.log(response.data, 'I want to see groups data');
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleView = (groupId) => {
    navigate(`/cricket/groupsData/players?groupId=${groupId}`);
  };

  if (groupData.length === 0) {
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
  const currentItems = groupData.slice(indexOfFirstItem, indexOfLastItem);
  const startSerialNumber = (currentPage - 1) * itemsPerPage + 1;

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th className="table-header">Sr. No.</th>
            <th className="table-header">TableID</th>
            <th className="table-header">GroupId</th>
            <th className="table-header">Ball</th>
            <th className="table-header">isMatchOver</th>
            <th className="table-header">players</th>
            <th className="table-header">View</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={item._id}>
              <td className="table-cell">{startSerialNumber + index}</td>
              <td className="table-cell">{item.tableId}</td>
              <td className="table-cell">{item._id}</td>
              <td className="table-cell">{item.ball}</td>
              <td className="table-cell">{item.isMatchOver.toString()}</td>
              <td className="table-cell">{item.group.length}</td>
                <td className="table-cell">
                <button className="button userHistory-button" onClick={() => handleView(item._id)}>
                  <i className="fas fa-eye"></i> View
                </button>
              </td>

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
          disabled={indexOfLastItem >= groupData.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CricketGroups;

