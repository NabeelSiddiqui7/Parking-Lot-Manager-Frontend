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
  const [bookedSpaces, setBookedSpaces] = useState<any[]>([]);
  const [parkingLotData, setParkingLotData] = React.useState({
    id: 0,
    length: 0,
    location: 'empty',
    managerusername: '',
    name: '',
    rate: '',
    width: 0
  }) 

  const getResult = async () => {
    let url = `http://localhost:5000/user/lot`;
    const res = await axios.get(url, {params: {id: id }});
    const data = res.data;
    setResults(data);
    const booked = [];
    for(var i = 0; i < data.booked.length; i++){
      booked.push(data.booked[i].id);
    }
    setBookedSpaces(booked);

    let lotsUrl = `http://localhost:5000/user/lots?sortField=$name&order=$asc`;
    const lotsRes = await axios.get(lotsUrl);
    const newdata = lotsRes.data;
    const filteredList = newdata.filter((data:any) => data.id == Number(id));
    setParkingLotData(filteredList[0]);
  }

  useEffect(() => {
    getResult();
   },[])

  const location = useLocation();
  const data = location.state;

  if (parkingLotData.location != "empty"){
    return (
      <div className="h-screen w-100vw" style={{ backgroundImage: `url(${bgImg})` }}>

        <HeaderMain />

        <div className="backdrop-blur-main h-full flex flex-col">
          <div className="flex justify-center text-4xl md:text-5xl font-bold text-[#EFEFEF] pt-10 md:pt-16 mb-4">
              Parking Lot: {parkingLotData.name}
          </div>
          {/* <ParkingLotGrid results={results} booked={bookedSpaces} length={data.length} width={data.width}/> */}
          <ParkingLotGrid results={results} booked={bookedSpaces} rate={parkingLotData.rate} length={parkingLotData.length} width={parkingLotData.width}/>
        </div>
      </div>
    );
  } else {return (
    <></>
  )}
}
