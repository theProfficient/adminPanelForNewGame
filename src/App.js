import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import BasicForm from "./components/forms/basicForm";
import Home from "./routes/Home";
import Ticket from "./routes/Ticket";
import TicketHistoryData from "./components/tickets/TicketHistoryData"
import RetailersContent from "./components/retailers/RetailersContent"
import RetailersHistory from "./components/retailers/RetailersHistory"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            !isLoggedIn ? (
              <BasicForm onLogin={handleLogin} />
            ) : (
              <Navigate to="/home" />
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
        <Route path="/ticketData/ticket" element={<TicketHistoryData/>} />
        <Route path="/retailer/RetailersHistory" element={<RetailersHistory />} />
      </Routes>

    </>
  );
}

export default App;
