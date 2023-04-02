import React, { useState, useContext } from "react";
import axios from "axios";
import bgImg from "../images/BgMain1.svg";
import { HeaderMain } from "../components/HeaderMain";
import styles from "../styles/LoginPage.module.css";
import AuthContext from "../helper/AuthContext";
import { Link } from "react-router-dom";

/*To check if user is logged in, use the following in your page:

const { isLoggedIn, userName } = useContext(AuthContext);

  return (
    <>
      {isLoggedIn ? (
        // Your dashboard when the user is logged in
      ) : (
        // Your login form when the user is not logged in
      )}
    </>
  );
}

*/

function LoginForm() {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000'
  });
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axiosInstance.post("/manager/login", { username, password });
      const result = response.data;

      if (result === "Manager authenticated") {
        setIsLoggedIn({isLoggedIn: true, userName: username});
        // Login successful, redirect to dashboard or homepage
        window.location.href = "/Manager";
      } else {
        // Authentication failed, display error message
        setErrorMessage("Invalid username or password");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred during authentication");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn({isLoggedIn: false, userName: username});
  };

  //New variable to determine if user is logged in
  const { isLoggedIn } = useContext(AuthContext);

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
          className="backdrop-blur-main w-screen h-screen"
          style={{ background: "rgba(45, 50, 61, 0.5)" }}
        >
          <div className="m-5 lg:m-10 flex flex-col items-center">
              <div className="text-3xl lg:text-6xl font-bold text-[#EFEFEF] py-3">
                    Login
              </div>

              <div className={`${styles.loginContainer} p-20 mt-5 w-full md:w-[750px]`}>
                <form onSubmit={handleSubmit}>
                  <label
                      htmlFor="username"
                      className="text-3xl text-[#B6B6B6] font-light"
                  >
                    Username:
                  </label>

                  <input 
                    className="text-2xl rounded-md h-10 w-full border-[#2F2F2F] border-1 border-solid outline-none mt-2 p-2 bg-[#2F2F2F] text-[#B6B6B6] focus:outline-none" 
                    type="text" 
                    value={username} onChange={(e) => setUsername(e.target.value)} 
                  />

                  <div className="flex flex-col sm:flex-row justify-between pb-2 mt-10">
                    <label
                        htmlFor="password"
                        className="text-3xl text-[#B6B6B6] font-light"
                    >
                      Password:
                    </label>
                  </div>
                  
                  <input 
                    className="text-2xl rounded-md h-10 w-full border-[#2F2F2F] border-1 border-solid outline-none mt-2 p-2 bg-[#2F2F2F] text-[#B6B6B6] focus:outline-none" 
                    type="password" 
                    value={password} onChange={(e) => setPassword(e.target.value)} 
                   />
                  
                  <div className="flex flex-row mt-10 mb-5 justify-between">
                    <button 
                      type="submit" 
                      className={`${styles.loginButton} text-3xl mt-5 font-base border rounded shadow`}
                      disabled={username == "" || password == ""}
                    >
                      Login
                    </button>
                    {errorMessage && <div className="text-[#B05E5E] text-2xl mt-5 pr-2">{errorMessage}</div>}
                  </div>
                </form>
              </div>

              <div className="flex flex-row mt-10 mb-5 justify-between">
                    <Link
                        className="text-3xl text-[#B6B6B6] font-light"
                        to="/"
                    >
                        Back
                    </Link>
                </div>
          </div>
        </div>
      </div>
  )}

export default LoginForm;