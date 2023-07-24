// import React from 'react';

// const NumberButtons = ({ handleButtonClick }) => {
//   const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

//   const multipliers = [
//     { label: '1x', value: 9 },
//     { label: '2x', value: 18 },
//     { label: '3x', value: 27 },
//   ];

//   const buttonStyle = {
//     fontSize: '16px',
//     fontWeight: 'bold',
//     padding: '8px',
//     margin: '4px',
//     width: '48px',
//     height: '48px',
//     borderRadius: '6px',
//     background: '#3498db', // Blue background color
//     color: '#fff', // White text color
//     border: 'none',
//     boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
//     cursor: 'pointer',
//     transition: 'background 0.3s ease',
//   };

//   return (
//     <div>
//       {multipliers.map((multiplier) => (
//         <button
//           key={multiplier.label}
//           style={buttonStyle}
//           onClick={() => handleButtonClick(multiplier.value)}
//         >
//           {multiplier.label}
//         </button>
//       ))}

//       {numbers.map((number) => (
//         <button key={number} style={buttonStyle} onClick={() => handleButtonClick(number)}>
//           {number}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default NumberButtons;
