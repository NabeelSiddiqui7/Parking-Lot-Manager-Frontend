import React, { useState, useEffect } from "react";
import bgImg from "../images/BgMain.svg";
import { SearchBar } from "../components/SearchBar";
import { HeaderMain } from "../components/HeaderMain";

export default function Customer() {


  return (
    <div className="h-screen" style={{ backgroundImage: `url(${bgImg})` }}>

      <HeaderMain />

      <div className="backdrop-blur-main h-full">
        <div className="p-10 pl-10">
          <SearchBar />
        </div>

        <div>
        <table className="p-10 pl-10 ml-10 bg-white">
          <tr>
            <th>Name</th>
            <th>Free Spots</th>
            <th>Location</th>
          </tr>
          <tr>
            <td>Lorem Ipsum</td>
            <td>Lorem Ipsum</td>
            <td>Lorem Ipsum</td>
          </tr>
          <tr>
            <td>Lorem Ipsum</td>
            <td>Lorem Ipsum</td>
            <td>Lorem Ipsum</td>
          </tr>
        </table>
      </div>
      </div>
    </div>
  );
}
