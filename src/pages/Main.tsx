import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import bgImg from "../images/BgMain.svg";
import { SearchBar } from "../components/SearchBar";
import { HeaderMain } from "../components/HeaderMain";
import {SlArrowRight} from "react-icons/sl"
import axios from "axios";

export default function Customer() {
  const [originalData, setOriginalData] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>(["empty"]);
  

  const sortItems = [
    { display: "Name, Asc.", field: "name", order: "asc" },
    { display: "Name, Desc.", field: "name", order: "desc" },
    { display: "Location, Asc.", field: "location", order: "asc" },
    { display: "Location, Desc.", field: "name", order: "desc" },
  ];

  const [filter, setFilter] = useState<number>(0);
  const [sort, setSort] = useState<any>(sortItems[0]);



  const getResult = async () => {
    let url = `http://localhost:5000/user/lots?sortField=${sort.field}&order=${sort.order}`;
    const res = await axios.get(url);
    const data = res.data;
    setOriginalData(data);
    setResults(data);
  }


   useEffect(() => {
    if (filter === 5) {
      setResults(originalData.filter((item) => item.rate < 5.0));
    } else if (filter === 10) {
      setResults(originalData.filter((item) => item.rate < 10.0));
    } else if (filter === 20) {
      setResults(originalData.filter((item) => item.rate < 20.0));
    } else if (filter === 20) {
      setResults(originalData.filter((item) => item.rate < 10000000.0));
    } else {
      setResults(originalData);
    }
  }, [filter, originalData]);

  useEffect(() => {
    getResult();
   },[sort])

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
          </div>

          <div className="p-10 flex justify-center">
            <p className="mx-5 text-white">Sort:</p>
            <Select 
              className="text-base text-black"
              onChange={(e) => {
                if (e) {
                  setSort(e.value);
                }
              }}
              defaultValue={{
                value: sortItems[0],
                label: sortItems[0].display,
              }}
              options={sortItems.map((item) => {
                return { value: item, label: item.display };
              })}
              isSearchable={false}
            />
            <p className="mx-5 text-white">Rate:</p>
            <Select
              className="text-base text-black"
              onChange={(e) => {
                if (e) {
                  setFilter(e.value);
                } else {
                  setFilter(0);
                }
              }}
              defaultValue={{
                value: 0,
                label: "Select",
                }}
                options={[
                {value: 10000000, label: "Any"},  
                { value: 5, label: "Rate less than $5" },
                { value: 10, label: "Rate less than $10" },
                { value: 20, label: "Rate less than $20" },
                ]}
                isSearchable={false}
              />
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