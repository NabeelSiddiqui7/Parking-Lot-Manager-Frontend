
import React from "react";
// import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Customer from "./pages/Main";
import ManagerMain from "./pages/ManagerMain";
import ManagerListMain from "./pages/ManagerListMain";
import ParkingLot from "./pages/ParkingLot";
import Login from "./pages/Login";




function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Customer />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Manager" element={<ManagerMain />} />
          <Route path="/ManagerList" element={<ManagerListMain />} />
          <Route path="/ParkingLot" element={<ParkingLot />} />
            {/* all routes inside this wrapper are protected by login */}
        </Routes>
      </BrowserRouter>
  );
}

export default App;