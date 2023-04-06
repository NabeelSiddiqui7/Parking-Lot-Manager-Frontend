import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import bgImg from "../images/BgMain1.svg";
import { SearchBar } from "../components/SearchBar";
import { HeaderMain } from "../components/HeaderMain";
import {SlArrowRight} from "react-icons/sl"
import axios from "axios";

export default function Customer() {
  const [results, setResults] = useState<any[]>(["empty"]);
  const [search, setSearch] = useState<any>("");
  const [originalResults, setOriginalResults] = useState<any[]>([]);
  

  const sortItems = [
    { display: "Name, Asc.", field: "name", order: "asc" },
    { display: "Name, Desc.", field: "name", order: "desc" },
    { display: "Location, Asc.", field: "location", order: "asc" },
    { display: "Location, Desc.", field: "location", order: "desc" },
  ];

  const [sort, setSort] = useState<any>(sortItems[0]);
  const [filter, setFilter] = useState<number>(0);
  const [occupancyFilter, setOccupancyFilter] = useState<string>('any');

  
  



  const getResult = async () => {
    let url = `http://localhost:5000/user/lots`;
    const res = await axios.get(url);
    const data = res.data;
    setOriginalResults(data);
    setResults(data);
  }

  useEffect(() => {
    getResult();
   },[search]);

   useEffect(() => {
    let filteredData = [...originalResults];
    
    if (occupancyFilter === "empty") {
      filteredData = filteredData.filter((item) => item.count > 0);
    } else if (occupancyFilter !== "any") {
      filteredData = filteredData.filter((item) => item.count >= 1);
    }

    if (filter === 5) {
      filteredData = filteredData.filter((item) => item.rate < 5.0);
    } else if (filter === 10) {
      filteredData = filteredData.filter((item) => item.rate < 10.0);
    } else if (filter === 20) {
      filteredData = filteredData.filter((item) => item.rate < 20.0);
    }
    
    filteredData.sort((a, b) => {
      if (sort.order === "asc") {
        return a[sort.field].localeCompare(b[sort.field]);
      } else {
        return b[sort.field].localeCompare(a[sort.field]);
      }
    });
    setResults(filteredData);
  }, [occupancyFilter, filter, originalResults, sort]);


  useEffect(() => {
    if (search.length > 0) {
      const filtered = originalResults.filter(
        (obj: { name: any; location: any }) => {
          return (
            obj.name.toLowerCase().startsWith(search.toLowerCase()) ||
            obj.location.toLowerCase().startsWith(search.toLowerCase())
          );
        }
      );
      setResults(filtered);
    } else {
      setResults(originalResults);
    }
  }, [search, originalResults]);



   const callback = (e:any) => {
    setSearch(e.target.value);
  }

  if (results[0] !== "empty") {
    return (
      <div className="h-screen w-100vw" style={{ backgroundImage: `url(${bgImg})` }}>
  
        <HeaderMain />
  
        <div className="backdrop-blur-main">
          <div className="flex justify-center text-4xl md:text-5xl font-bold text-[#EFEFEF] pt-10 md:pt-16 mb-4">
                Available Lots
          </div>

          <div className="p-10 flex justify-center">
            <SearchBar placeholder="Find Lot" func={callback} />

            <div className="flex flex-row items-center">
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
              
              <p className="mx-5 text-white">Occupancy:</p>
              <Select
              className="text-base text-black"
              onChange={(e) => {
                if (e) {
                  setOccupancyFilter(e.value);
                } else {
                  setOccupancyFilter('');
                }
              }}
              defaultValue={{
                value: 'any',
                label: "Select",
                }}
                options={[
                {value: 'any', label: "Any"},  
                {value: 'empty', label: "Not Full" },
            
                ]}
                isSearchable={false}
              />
          </div>
        </div>
          
          
  
          <div className="m-auto w-2/3 relative overflow-x-auto shadow-md sm:rounded-lg">
            {
              results.length > 0?
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-7">Name</th>
                  <th scope="col" className="px-6 py-7">Location</th>
                  <th scope="col" className="px-6 py-7">Rate</th>
                  <th scope="col" className="px-6 py-7 w-44">Available Spots</th>
                </tr>
              </thead>
                {results.map((result:any) => {
                  return <tbody key={result.id} id={result.id}>
                    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                      <td className="px-6 py-4">{result.name}</td>
                      <td className="px-8 py-4">{result.location}</td>
                      <td className="px-8 py-4">${result.rate}</td>
                      <td className="px-8 py-4"><div className="flex justify-between pr-2"> {result.count} <Link className="pl-12" to={`/ParkingLot/${result.id}`} state={{length: result.length, width: result.width, name: result.name}}><SlArrowRight/></Link></div></td>
                    </tr>
                  </tbody>                
                })}
            </table>
            :
            <div className="bg-white w-2/3 text-md rounded-md opacity-25 text-black py-12 px-8 mx-auto text-center">No Results Found</div>
            }
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
  
        <div className="backdrop-blur-main">
          <div className="p-10 flex justify-center">
            <SearchBar placeholder="Find Lot" />
            <div className="flex flex-row items-center">
              <p className="mx-5 text-white">Filter:</p>
              <Select className="text-base text-black"/>
            </div>
          </div>
  
          <div className="m-auto w-2/3 relative overflow-x-auto shadow-md sm:rounded-lg">
          </div>
        </div>
      </div>
    );
  }
}