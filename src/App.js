import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import BasicForm from "./components/forms/basicForm";
import Home from "./routes/Home";
import Dashboard from "./routes/Dashboard";
import Contact from "./routes/Contact";
import Games from "./routes/Games";
import Cricket from "./components/games/Cricket";
import UserHistory from "./components/UserHistory";
import CricketGroups from "./components/games/CricketGroups";
import UserHistoryData from "./components/UserHistoryData"
import RetailersContent from "./components/RetailersContent"
import RetailersHistory from "./components/RetailersHistory"

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
          path="/games"
          element={isLoggedIn ? <Games /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/contact"
          element={isLoggedIn ? <Contact /> : <Navigate to="/" />}
        />


          <Route
          path="/retailers"
          element={isLoggedIn ? <RetailersContent /> : <Navigate to="/" />}
        />
        
        {/* <Route
          path="/createTournament"
          element={isLoggedIn ? <CreateTournament /> : <Navigate to="/" />} */}
        {/* />{" "} */}
        {/* Update the route path and component name */}
        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate to="/" />}
        />
        <Route path="/games/cricket" element={<Cricket />} />
        <Route path="/games/cricket/Groups" element={<CricketGroups />} />
        <Route path="/ticketData/ticket" element={<UserHistoryData/>} />
        <Route path="/user/history" element={<UserHistory />} />
        <Route path="/retailer/RetailersHistory" element={<RetailersHistory />} />
      </Routes>

    </>
  );
}

export default App;
