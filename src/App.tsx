
import React, { useState } from "react";
// import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import Customer from "./pages/Main";
import ManagerMain from "./pages/ManagerMain";
import ManagerListMain from "./pages/ManagerListMain";
import ParkingLot from "./pages/ParkingLot";
import Login from "./pages/Login";
import {AuthProvider} from "./helper/AuthContext";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Customer" element={<Customer />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Manager" element={<ManagerMain />} />
          <Route path="/ManagerList" element={<ManagerListMain />} />
          <Route path="/ParkingLot" element={<ParkingLot />}>
            <Route path="/ParkingLot/:id"/>
          </Route>
            {/* all routes inside this wrapper are protected by login */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;