import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import bgImg from "../images/BgMain.svg";
import { SearchBar } from "../components/SearchBar";
import { HeaderMain } from "../components/HeaderMain";
import {SlArrowRight} from "react-icons/sl"
import styles from "../styles/LoginPage.module.css";
import Checkbox from "../components/Checkboxes";

export default function Login() {


  return (
    <div className="h-screen w-100vw" style={{ backgroundImage: `url(${bgImg})` }}>

      <HeaderMain />
      <div className="m-5 lg:m-10 flex flex-col items-center">
        <div className="flex justify-center text-4xl md:text-5xl font-bold text-[#EFEFEF] mt-10 md:mt-16 mb-4">
              Login
        </div>

        <div className={`${styles.loginContainer} p-10 mt-5 w-full md:w-[500px]`}>
              <Checkbox/>
              <label
                htmlFor="username"
                className="text-base lg:text-lg text-[#B6B6B6] font-light"
              >
                Username or Email Address
              </label>

              <label
                htmlFor="password"
                className="text-base lg:text-lg text-[#B6B6B6] font-light"
              >
                Password
              </label>
        </div>
      </div>
    </div>
  );
}
