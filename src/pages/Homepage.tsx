import React, { useState, useContext } from "react";
import axios from "axios";
import bgImg from "../images/BgMain.svg";
import { HeaderMain } from "../components/HeaderMain";
import styles from "../styles/LoginPage.module.css";
import AuthContext from "../helper/AuthContext";
import { Link } from "react-router-dom";

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
      display: "flex",
      justifyContent: "center",
    }}
  >
    <div
      className="backdrop-blur-main min-h-screen flex flex-col justify-center items-center"
      style={{ 
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        background: "rgba(45, 50, 61, 0.5)" 
    }}
    >
          <div className="text-3xl lg:text-6xl font-bold text-[#EFEFEF] py-3 text-center">
                Hello! What kind of user are you?
          </div>

          <div className={`${styles.loginContainer} p-10 mt-5 w-full md:w-[750px] items-center`}>
                <Link
                    className={`${styles.loginButton} text-3xl mt-5 font-base border rounded shadow`}
                    to="/Customer"
                >
                    I am a customer
                </Link>

                <div className="flex flex-row mt-10 mb-5 justify-between">
                    <Link
                        className={`${styles.loginButton} text-3xl mt-5 font-base border rounded shadow`}
                        to="/Login"
                    >
                        I am a manager
                    </Link>
                </div>
          </div>
    </div>
  </div>
    )
}
