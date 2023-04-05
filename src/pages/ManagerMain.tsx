
import React, { useState, useEffect } from "react";
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

export default function ManagerMain() {
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
              <p>Total Revenue: $250</p>
              <p>Total Occupancy: 12</p>
              <p>Average Rate: $7.6</p>
            </div>
        </div>
        <div className="flex justify-center text-4xl md:text-5xl font-bold text-[#EFEFEF] pt-6 md:pt-12">
              Your Lots
        </div>
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
              <th scope="col" className="px-4 py-7">Location</th>
              <th scope="col" className="px-4 py-7">Rate</th>
              <th scope="col" className="px-4 py-7">Occupancy</th>
              <th scope="col" className="px-4 py-7 w-44">Revenue</th>
            </tr>
          </thead>
          <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            <td className="px-6 py-4">myfirstlot</td>
            <td className="px-6 py-4">idk1</td>
            <td className="px-6 py-4">$10.2</td>
            <td className="px-6 py-4">0</td>
            <td className="px-6 py-4">$150</td>
          </tr>
          <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4">mySecondlot</td>
            <td className="px-6 py-4">idk2</td>
            <td className="px-6 py-4">$5</td>
            <td className="px-6 py-4">12</td>
            <td className="px-6 py-4">$100</td>
          </tr>
        </table>
        <button className="mt-3 w-full text-white bg-neutral-700 py-1" onClick={handleOpen}>
          <div className="flex justify-center items-center">
            Add Lot
            <AiOutlinePlusCircle size={"1.25rem"} className="m-2"/>
          </div>
        </button>
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
    </div>
  );
}