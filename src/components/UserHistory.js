// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import './games/CricketStyle.css';
// import { useLocation,useNavigate } from 'react-router-dom';

// const Dashboard = () =>  {
// const navigate = useNavigate();
// const location = useLocation();
// const queryParams = new URLSearchParams(location.search);

// const [ticketData, setTicketData] = useState([]);
// const [currentPage, setCurrentPage] = useState(1);
// const [itemsPerPage] = useState(10);


// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await axios.get('localhost:5000/getAllTicketData');
//       const sortedData = response.data.sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime));
//       setTicketData(sortedData);
//       console.log(sortedData, "group data");
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };
//   fetchData(); // Initial fetch
//   const interval = setInterval(fetchData, 3000); // Fetch every 2 seconds

//   return () => {
//     clearInterval(interval); // Clean up the interval on component unmount
//   };
// }, []);

// const handleView = (ticketId) => {
//   navigate(`/ticketData/ticket?ticketId=${ticketId}`);
// };

// if (ticketData.length === 0) {
//   return <div>Loading...</div>;
// }

// const goToPreviousPage = () => {
//   setCurrentPage(currentPage - 1);
// };

// const goToNextPage = () => {
//   setCurrentPage(currentPage + 1);
// };

// const indexOfLastItem = currentPage * itemsPerPage;
// const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// const currentItems = ticketData.slice(indexOfFirstItem, indexOfLastItem);
// const startSerialNumber = (currentPage - 1) * itemsPerPage + 1;

// return (
//   <div>
//     <table className="table">
//       <thead>
//         <tr>
//           <th className="table-header">Sr. No.</th>
//           <th className="table-header">Ticket Number</th>
//           <th className="table-header">RetailerId</th>
//           <th className="table-header">View</th>
//         </tr>
//       </thead>
//       <tbody>
//         {currentItems.map((item, index) => (
//           <tr key={item._id}>
//             <td className="table-cell">{startSerialNumber + index}</td>
//             <td className="table-cell">{item.ticketNumber}</td>
//             <td className="table-cell">{item.retailerId}</td>
//             <td className="table-cell">
//               <button className="button userHistory-button" onClick={() => handleView(item.ticketNumber)}>
//                 <i className="fas fa-eye"></i> View
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>

//     <div className="pagination">
//       <button
//         className="button"
//         onClick={goToPreviousPage}
//         disabled={currentPage === 1}
//         style={{ marginRight: '10px' }}
//       >
//         Previous
//       </button>
//       <button
//         className="button"
//         onClick={goToNextPage}
//         disabled={indexOfLastItem >= ticketData.length}
//         style={{ marginLeft: '10px' }}
//       >
//         Next
//       </button>
//     </div>
//   </div>
// );
// };
// export default Dashboard;
