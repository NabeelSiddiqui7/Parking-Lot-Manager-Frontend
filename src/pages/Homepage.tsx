import React, { useState, useContext } from "react";
import axios from "axios";
import bgImg from "../images/BgMain.svg";
import { HeaderMain } from "../components/HeaderMain";
import styles from "../styles/LoginPage.module.css";
import AuthContext from "../helper/AuthContext";


export default function Homepage() {
  //New variable to determine if user is logged in
  const { isLoggedIn, userName } = useContext(AuthContext);

  return (
    <div
    style={{
      backgroundImage: `url(${bgImg})`,
      width: "100vw",
      height: "100vh",
      paddingBottom: "10rem",
    }}
    >
        <div
        className="backdrop-blur-main w-screen h-screen"
        style={{ background: "rgba(45, 50, 61, 0.5)" }}
        >
        <HeaderMain />
            <div className="m-5 lg:m-10 flex flex-col items-center">
            {isLoggedIn ? (
                <div className="text-3xl lg:text-6xl font-bold text-[#EFEFEF] py-3">
                Hello {userName}!
                </div>
            ) : (
                <div className="text-3xl lg:text-6xl font-bold text-[#EFEFEF] py-3">
                Welcome customer!
                </div>    
            )}
            </div>
        </div>
    </div>
    )
}
