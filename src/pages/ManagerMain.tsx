
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import bgImg from "../images/BgMain1.svg";
import { SearchBar } from "../components/SearchBar";
import { HeaderMain } from "../components/HeaderMain";
import {AiOutlinePlusCircle} from "react-icons/ai"

export default function ManagerMain() {


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
        <button className="mt-3 w-full text-white bg-neutral-700 py-1">
          <div className="flex justify-center items-center">
            Add Lot
            <AiOutlinePlusCircle size={"1.25rem"} className="m-2"/>
          </div>
        </button>
      </div>
      </div>
    </div>
  );
}