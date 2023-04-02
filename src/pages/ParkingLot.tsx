import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import bgImg from "../images/BgMain1.svg";
import { SearchBar } from "../components/SearchBar";
import { HeaderMain } from "../components/HeaderMain";
import { ParkingLotGrid } from "../components/ParkingLotGrid";
import { useParams, useLocation } from 'react-router-dom'
import {SlArrowRight} from "react-icons/sl"
import axios from "axios";

export default function ParkingLot() {
  const { id } = useParams()
  const [results, setResults] = useState<any[]>(["empty"]);

  const getResult = async () => {
    let url = `http://localhost:5000/user/lot`;
    const res = await axios.get(url);
    const data = res.data;
    setResults(data);
  }

  useEffect(() => {
    getResult();
   },[])

  const location = useLocation();
  const data = location.state;

  return (
    <div className="h-screen w-100vw" style={{ backgroundImage: `url(${bgImg})` }}>

      <HeaderMain />

      <div className="backdrop-blur-main h-full flex flex-col">
        <div className="flex justify-center text-4xl md:text-5xl font-bold text-[#EFEFEF] pt-10 md:pt-16 mb-4">
            Parking Lot: {data.name}
        </div>
        <ParkingLotGrid length={data.length} width={data.width}/>
      </div>
    </div>
  );
}
