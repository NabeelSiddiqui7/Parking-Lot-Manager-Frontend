import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import bgImg from "../images/BgMain.svg";
import { SearchBar } from "../components/SearchBar";
import { HeaderMain } from "../components/HeaderMain";
import { ParkingLotGrid } from "../components/ParkingLotGrid";
import {SlArrowRight} from "react-icons/sl"

export default function ParkingLot() {


  return (
    <div className="h-screen w-100vw" style={{ backgroundImage: `url(${bgImg})` }}>

      <HeaderMain />

      <div className="flex justify-center text-4xl md:text-5xl font-bold text-[#EFEFEF] mt-10 md:mt-16 mb-4">
            Parking Lot X
      </div>

      <div className="backdrop-blur-main h-full flex flex-col">
        <ParkingLotGrid></ParkingLotGrid>
      </div>
    </div>
  );
}
