import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import BasicForm from "./components/forms/basicForm";
import Home from "./routes/Home";
import Ticket from "./routes/Ticket";
import TicketHistoryData from "./components/tickets/TicketHistoryData";
import RetailersContent from "./components/retailers/RetailersContent";
import RetailersHistory from "./components/retailers/RetailersHistory";
import IntroImage from "./assets/blue2.jpg"; // Import the image here
import "./components/allTableStyle.css/AppStyle.css"; // Import the CSS file

function App() {
  // Check if there's a login status stored in the browser storage
  const initialLoginStatus = localStorage.getItem("isLoggedIn") === "true";

  const [isLoggedIn, setIsLoggedIn] = useState(initialLoginStatus);
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Update the browser storage whenever the login status changes
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <div className="app-container" style={{ backgroundImage: `url(${IntroImage})` }}>
      <>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/home" />
              ) : (
                <BasicForm onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/Ticket"
            element={isLoggedIn ? <Ticket /> : <Navigate to="/" />}
          />
          <Route
            path="/retailers"
            element={isLoggedIn ? <RetailersContent /> : <Navigate to="/" />}
          />
          <Route
            path="/home"
            element={isLoggedIn ? <Home /> : <Navigate to="/" />}
          />
          <Route path="/ticketData/ticket" element={<TicketHistoryData />} />
          <Route path="/retailer/RetailersHistory" element={<RetailersHistory />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
