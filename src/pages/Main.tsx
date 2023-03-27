import React, { useState, useEffect } from "react";
import bgImg from "../images/BgMain.svg";
import { SearchBar } from "../components/SearchBar";
import { HeaderMain } from "../components/HeaderMain";

export default function Customer() {


  return (
    <div className="h-screen w-screen" style={{ backgroundImage: `url(${bgImg})` }}>

      <HeaderMain />

      <div className="backdrop-blur-main h-full">
        <div className="p-10 pl-10">
          <SearchBar />
        </div>

        <div className="m-10 w-1/2 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="p-5">
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Free Spots</th>
              <th scope="col" className="px-6 py-3">Location</th>
            </tr>
          </thead>
          <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            <td className="px-2">Lorem Ipsum</td>
            <td className="px-2">Lorem Ipsum</td>
            <td className="px-2">Lorem Ipsum</td>
          </tr>
          <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <td className="px-2">Lorem Ipsum</td>
            <td className="px-2">Lorem Ipsum</td>
            <td className="px-2">Lorem Ipsum</td>
          </tr>
          <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <td className="px-2">Lorem Ipsum</td>
            <td className="px-2">Lorem Ipsum</td>
            <td className="px-2">Lorem Ipsum</td>
          </tr>
          <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <td className="px-2">Lorem Ipsum</td>
            <td className="px-2">Lorem Ipsum</td>
            <td className="px-2">Lorem Ipsum</td>
          </tr>
          <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <td className="px-2">Lorem Ipsum</td>
            <td className="px-2">Lorem Ipsum</td>
            <td className="px-2">Lorem Ipsum</td>
          </tr>
          <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <td className="px-2">Lorem Ipsum</td>
            <td className="px-2">Lorem Ipsum</td>
            <td className="px-2">Lorem Ipsum</td>
          </tr>
        </table>
      </div>
      </div>
    </div>
  );
}
