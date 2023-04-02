import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import bgImg from "../images/BgMain1.svg";
import { SearchBar } from "../components/SearchBar";
import { HeaderMain } from "../components/HeaderMain";
import {SlArrowRight} from "react-icons/sl"
import { AiOutlinePlusCircle } from "react-icons/ai";

export default function ManagerListMain() {


  return (
    <div className="h-screen w-100vw" style={{ backgroundImage: `url(${bgImg})` }}>

      <HeaderMain />

      <div className="backdrop-blur-main h-full">
        <div className="flex justify-center text-4xl md:text-5xl font-bold text-[#EFEFEF] pt-10 md:pt-16 mb-4">
              Managers
        </div>
        <div className="p-10 flex justify-center">
          <SearchBar placeholder="Find Manager"/>
          <div className="flex flex-row items-center">
            <p className="mx-5 text-white">Filter:</p>
            <Select className="text-base text-black"/>
          </div>
        </div>

        <div className="m-auto w-3/5 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-7 w-1/3">Name</th>
              <th scope="col" className="px-2 py-7">Lots</th>
            </tr>
          </thead>
          <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            <td className="px-4 py-4">Lorem Ipsum</td>
            <td className="px-2 py-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam, perferendis.</td>
          </tr>
          <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <td className="px-4 py-4">Lorem Ipsum</td>
            <td className="px-2 py-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam, perferendis.</td>
          </tr>
          <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <td className="px-4 py-4">Lorem Ipsum</td>
            <td className="px-2 py-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam, perferendis.</td>
          </tr>
          <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <td className="px-4 py-4">Lorem Ipsum</td>
            <td className="px-2 py-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam, perferendis.</td>
          </tr>
          <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <td className="px-4 py-4">Lorem Ipsum</td>
            <td className="px-2 py-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam, perferendis.</td>
          </tr>
          <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <td className="px-4 py-4">Lorem Ipsum</td>
            <td className="px-2 py-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam, perferendis.</td>
          </tr>
        </table>
        <button className="mt-3 w-full text-white bg-blue-400 py-1">
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
