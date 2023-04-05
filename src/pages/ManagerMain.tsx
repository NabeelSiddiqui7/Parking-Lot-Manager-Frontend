
import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import bgImg from "../images/BgMain1.svg";
import { SearchBar } from "../components/SearchBar";
import { HeaderMain } from "../components/HeaderMain";
import {AiOutlinePlusCircle} from "react-icons/ai"
import { Modal } from "@mui/material";
import Box from '@mui/material/Box';
import { number } from "yargs";
import axios from "axios";
import AuthContext from "../helper/AuthContext";

export default function ManagerMain() {

  const { isLoggedIn, userName } = useContext(AuthContext);
  const [results, setResults] = useState<any[]>(["empty"]);
  const [search, setSearch] = useState<any>("");
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [totalOccupancy, setTotalOccupancy] = useState<number>(0);
  const [averageRate, setAverageRate] = useState<number>(0);

  const sortItems = [
    { display: "Name, Asc.", field: "name", order: "asc" },
    { display: "Name, Desc.", field: "name", order: "desc" },
    { display: "Location, Asc.", field: "location", order: "asc" },
    { display: "Location, Desc.", field: "location", order: "desc" },
  ];

  const [filter, setFilter] = useState<number>(0);
  const [sort, setSort] = useState<any>(sortItems[0]);

  const getResult = async () => {
    let url = `http://localhost:5000/user/lots?sortField=${sort.field}&order=${sort.order}`;
    const res = await axios.get(url);
    const data = res.data.filter((obj: { managerusername: any }) => {
      return obj.managerusername == userName;
    });
    
    if(search.length > 0){
      const filtered = data.filter((obj: { name: any, location:any }) => {
        return obj.name.startsWith(search) || obj.location.startsWith(search);
      });
      setResults(filtered);
    }
    else{
      setResults(data);
    }
  }


   useEffect(() => {
    if (filter === 5) {
      setResults(results.filter((item) => item.rate < 5.0));
    } else if (filter === 10) {
      setResults(results.filter((item) => item.rate < 10.0));
    } else if (filter === 20) {
      setResults(results.filter((item) => item.rate < 20.0));
    } else if (filter === 20) {
      setResults(results.filter((item) => item.rate < 10000000.0));
    } else {
      setResults(results);
    }
  }, [filter]);

  useEffect(() => {
    getResult();
   },[sort,search]);

   const callback = (e:any) => {
    setSearch(e.target.value);
  }

  useEffect(() => {
    calculateTotals(results);
  }, [results]);
  
  function calculateTotals(data: any){
    let totalRevenue = 0;
    let totalOccupancy = 0;
    let totalRate = 0;
    data.forEach((lot: any) => {
      totalRevenue += parseInt(lot.revenue) || 0;
      totalOccupancy += parseInt(lot.count) || 0;
      totalRate += parseFloat(lot.rate) || 0;
    });
    const numLots = data.length;
    const averageRate = numLots ? totalRate / numLots : 0;
    setTotalRevenue(totalRevenue);
    setTotalOccupancy(totalOccupancy);
    setAverageRate(averageRate);
  }
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [formData, setFormData] = React.useState({
    full_name: '',
    columns: 0,
    rows: 0,
    location: '',
    rate: 0,
    overtime: 0
  }) 

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [event.target.name]:event.target.value })
  }

  const putData = async () => {
    let url = `http://localhost:5000/manager/lots`;
    const res = await axios.post(url);
    const data = res.data;
    console.log(res);
  }

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 3,
    p: 4,
    margin: 'auto'
  };

  function handleSubmit(e:any) {
    e.preventDefault();
    putData();
  }

  return (
    <div className="h-screen w-100vw" style={{ backgroundImage: `url(${bgImg})` }}>

      <HeaderMain />

      <div className="backdrop-blur-main h-full">
        <div className="flex flex-col items-center">
            <div className="text-3xl lg:text-5xl text-center text-[#EFEFEF] mt-16">
              General Information
            </div>
            <div className="text-xl text-center text-[#EFEFEF] pt-6 px-4 flex flex-col items-center justify-center flex-wrap">
              <p>Total Revenue: ${totalRevenue}</p>
              <p>Total Occupancy: {totalOccupancy}</p>
              <p>Average Rate: ${averageRate}</p>
            </div>
        </div>
        <div className="flex justify-center text-4xl md:text-5xl font-bold text-[#EFEFEF] pt-6 md:pt-12">
              Your Lots
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
          </div>
        </div>

        <div className="m-auto w-2/3 relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-7">Name</th>
                  <th scope="col" className="px-4 py-7">Location</th>
                  <th scope="col" className="px-4 py-7">Rate</th>
                  <th scope="col" className="px-4 py-7">Occupancy</th>
                  <th scope="col" className="px-4 py-7 w-44">Revenue</th>
                </tr>
              </thead>
                {results.map((result:any) => {
                  return <tbody key={result.id} id={result.id}>
                    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                      <td className="px-6 py-4">{result.name}</td>
                      <td className="px-8 py-4">{result.location}</td>
                      <td className="px-8 py-4">${result.rate}</td>
                      <td className="px-8 py-4">{result.count}</td>
                      <td className="px-8 py-4">${result.revenue}</td>
                    </tr>
                  </tbody>                
                })}
            </table>
          </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className='mb-2'>Create Lot</h2>
            <form id='createTicket' onSubmit={handleSubmit}>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lot Name</label>
                <input type="text" name="full_name" onChange={handleInput} className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Columns</label>
                <input type="number" min="0" name="columns" onChange={handleInput} className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required/>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rows</label>
                <input type="number" min="0" name="rows" onChange={handleInput} className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required/>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                <input type="text" name="location" onChange={handleInput} className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required/>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rate</label>
                <input type="number" min="0" name="rate" onChange={handleInput} className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required/>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Overtime Rate</label>
                <input type="number" min="0" name="overtime" onChange={handleInput} className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required/>
            </form>            
          <button className="bg-blue-400 my-2 p-2 rounded-md" type="submit" form="createTicket" value="Submit">Submit</button>
        </Box>
      </Modal>
      </div>
      </div>
  );
}