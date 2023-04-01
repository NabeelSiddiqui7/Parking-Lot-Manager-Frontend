import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import bgImg from "../images/BgMain.svg";
import { SearchBar } from "../components/SearchBar";
import { HeaderMain } from "../components/HeaderMain";
import {SlArrowRight} from "react-icons/sl"
import axios from "axios";

export default function Customer() {
  const [results, setResults] = useState<any[]>(["empty"]);

  const getResult = async () => {
    let url = `http://localhost:5000/user/lots`;
    const res = await axios.get(url);
    const data = res.data;
    setResults(data);
  }

  useEffect(() => {
    getResult();
   },[])

  if (results[0] !== "empty") {
    console.log(results);
    return (
      <div className="h-screen w-100vw" style={{ backgroundImage: `url(${bgImg})` }}>
  
        <HeaderMain />
  
        <div className="flex justify-center text-4xl md:text-5xl font-bold text-[#EFEFEF] mt-10 md:mt-16 mb-4">
              Available Lots
        </div>
  
        <div className="backdrop-blur-main h-full">
          <div className="p-10 flex justify-center">
            <SearchBar placeholder="Find Lot" />
            <div className="flex flex-row items-center">
              <p className="mx-5 text-white">Filter:</p>
              <Select className="text-base text-black"/>
            </div>
          </div>
  
          <div className="m-auto w-2/3 relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-7">Name</th>
                  <th scope="col" className="px-6 py-7">Location</th>
                  <th scope="col" className="px-6 py-7">Rate</th>
                  <th scope="col" className="px-6 py-7 w-44">Occupancy</th>
                </tr>
              </thead>
                {results.map((result:any) => {
                  return <tbody key={result.id} id={result.id}>
                    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                      <td className="px-4 py-4">{result.name}</td>
                      <td className="px-2 py-4">{result.location}</td>
                      <td className="px-2 py-4">${result.rate}</td>
                      <td className="px-2 py-4"><div className="flex">Lorem Ipsum <Link className="pl-12" to={`/ParkingLot/${result.id}`} state={{length: result.length, width: result.width, name: result.name}}><SlArrowRight/></Link></div></td>
                    </tr>
                  </tbody>                
                })}
            </table>
          </div>
        </div>
      </div>
    );
  }
  else{
    return (
      <div className="h-screen w-100vw" style={{ backgroundImage: `url(${bgImg})` }}>
  
        <HeaderMain />
  
        <div className="flex justify-center text-4xl md:text-5xl font-bold text-[#EFEFEF] mt-10 md:mt-16 mb-4">
              Available Lots
        </div>
  
        <div className="backdrop-blur-main h-full">
          <div className="p-10 flex justify-center">
            <SearchBar placeholder="Find Lot" />
            <div className="flex flex-row items-center">
              <p className="mx-5 text-white">Filter:</p>
              <Select className="text-base text-black"/>
            </div>
          </div>
  
          <div className="m-auto w-2/3 relative overflow-x-auto shadow-md sm:rounded-lg">
            {/* <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-7">Name</th>
                  <th scope="col" className="px-6 py-7">Location</th>
                  <th scope="col" className="px-6 py-7">Rate</th>
                  <th scope="col" className="px-6 py-7 w-44">Occupancy</th>
                </tr>
              </thead>
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <td className="px-4 py-4">Lorem Ipsum</td>
                <td className="px-2 py-4">Lorem Ipsum</td>
                <td className="px-2 py-4">Lorem Ipsum</td>
                <td className="px-2 py-4"><div className="flex">Lorem Ipsum <Link className="pl-12" to="/ParkingLot"><SlArrowRight/></Link></div></td>
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <td className="px-4 py-4">Lorem Ipsum</td>
                <td className="px-2 py-4">Lorem Ipsum</td>
                <td className="px-2 py-4">Lorem Ipsum</td>
                <td className="px-2 py-4"><div className="flex">Lorem Ipsum <Link className="pl-12" to="/ParkingLot"><SlArrowRight/></Link></div></td>
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <td className="px-4 py-4">Lorem Ipsum</td>
                <td className="px-2 py-4">Lorem Ipsum</td>
                <td className="px-2 py-4">Lorem Ipsum</td>
                <td className="px-2 py-4"><div className="flex">Lorem Ipsum <Link className="pl-12" to="/ParkingLot"><SlArrowRight/></Link></div></td>
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <td className="px-4 py-4">Lorem Ipsum</td>
                <td className="px-2 py-4">Lorem Ipsum</td>
                <td className="px-2 py-4">Lorem Ipsum</td>
                <td className="px-2 py-4"><div className="flex">Lorem Ipsum <Link className="pl-12" to="/ParkingLot"><SlArrowRight/></Link></div></td>
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <td className="px-4 py-4">Lorem Ipsum</td>
                <td className="px-2 py-4">Lorem Ipsum</td>
                <td className="px-2 py-4">Lorem Ipsum</td>
                <td className="px-2 py-4"><div className="flex">Lorem Ipsum <Link className="pl-12" to="/ParkingLot"><SlArrowRight/></Link></div></td>
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <td className="px-4 py-4">Lorem Ipsum</td>
                <td className="px-2 py-4">Lorem Ipsum</td>
                <td className="px-2 py-4">Lorem Ipsum</td>
                <td className="px-2 py-4"><div className="flex">Lorem Ipsum <Link className="pl-12" to="/ParkingLot"><SlArrowRight/></Link></div></td>
              </tr>
            </table> */}
          </div>
        </div>
      </div>
    );
  }
}
