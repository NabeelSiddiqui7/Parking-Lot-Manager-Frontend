import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
// import "@szhsin/react-menu/dist/index.css";
// import "@szhsin/react-menu/dist/transitions/slide.css";
import styles from "../styles/HeaderMain.module.css";
import AuthContext from "../helper/AuthContext";

export function HeaderMain() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDesktop, setDesktop] = useState(window.innerWidth > 1024);
  const { setIsLoggedIn } = useContext(AuthContext);                      //Used to set the login status to logged out if it's clicked
  const { isLoggedIn } = useContext(AuthContext);                         //Variable to determine if user is logged in

  const location = useLocation();

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 1024);
  };

  const handleClick = () => {
    setMenuOpen(!menuOpen);
  };

  //Method to log the user out when clicked
  const handleLogout = () => {
    setIsLoggedIn({isLoggedIn: false, userName: ''});
    window.location.href = "/";
  };

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY + 30) {
        // if scroll down hide the navbar
        setMenuOpen(false);
      }
      // remember current page location to use in the next move
      setLastScrollY(window.scrollY);
    }
  };

  return (
    <div className="flex flex-col">
      <header
        className={`${styles.navbarContainer} flex  justify-between relative z-10 h-20`}
      >
        <div className="text-white flex p-5 flex-row">
          <div className="flex flex-row items-center justify-start">
          {isLoggedIn ? (
            <Link
              className={`text-3xl font-semibold lg:pl-6 flex flex-row items-center ${styles.navButton}`}
              to="/Manager">
              Parking Lot Manager
            </Link>
          ) : (
            <Link
              className={`text-3xl font-semibold lg:pl-6 flex flex-row items-center ${styles.navButton}`}
              to="/Customer">
              Parking Lot Manager
            </Link>
          )}
          {isLoggedIn ? (
            <div className="ml-12 flex flex-row items-center space-x-16">
              <Link
                className={`text-2xl lg:pl-1 flex flex-row items-center ${
                  location.pathname === "/Manager" ? styles.navButtonActive : styles.navButton
                }`}
                to="/Manager"
              >
                Manage Lots
              </Link>
              <Link
                className={`text-2xl lg:pl-1 flex flex-row items-center ${
                  location.pathname === "/ManagerList" ? styles.navButtonActive : styles.navButton
                }`}
                to="/ManagerList"
              >
                Managers
              </Link>
            </div>
          ):(
            <div className="ml-12 flex flex-row items-center space-x-16">
              <Link
                className={`text-2xl lg:pl-1 flex flex-row items-center ${
                  location.pathname === "/Customer" ? styles.navButtonActive : styles.navButton
                }`}
                to="/Customer"
              >
                Lots
              </Link>
            </div>
          )}
          </div>
        </div>
        <div className="text-white flex p-5 flex-row">
          <div className="flex flex-row items-center justify-start">
            <div className="ml-12 flex flex-row items-center space-x-16">
              {isLoggedIn ? (
                <form onSubmit={handleLogout}>
                  <button 
                      type="submit" 
                      className={`text-3xl lg:pl-6 flex flex-row items-center ${styles.navButton}`}
                    >
                      Logout
                    </button>
                </form>
              ) : (
                <Link
                  className={`text-3xl lg:pl-6 flex flex-row items-center ${styles.navButton}`}
                  to="/">
                  Return to Homepage
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
      {menuOpen ? (
        <div className={styles.mobileMenu}>
          {/* <Accordion title="Features">
            <div className={`${styles.darkMobileMenuItem} pl-8`}>
              <span className="flex flex-row items-center gap-2 text-rose-300">
                Compare Within Congress
                <BiLockAlt />
              </span>
            </div>
            <div className={`${styles.darkMobileMenuItem} pl-8`}>
              <span className="flex flex-row items-center gap-2 text-rose-300">
                Compare by party Over Time
                <BiLockAlt />
              </span>
            </div>
            <div className={`${styles.darkMobileMenuItem} pl-8`}>
              <span className="flex flex-row items-center gap-2 text-rose-300">
                Committees & Party Leaders
                <BiLockAlt />
              </span>
            </div>
            <div className={`${styles.darkMobileMenuItem} pl-8`}>
              <span className="flex flex-row items-center gap-2 text-rose-300">
                Voting Records
                <BiLockAlt />
              </span>
            </div>
            <div className={`${styles.darkMobileMenuItem} pl-8`}>
              <span className="flex flex-row items-center gap-2 text-rose-300">
                Custom Data Feeds
                <BiLockAlt />
              </span>
            </div>
          </Accordion>
          <Accordion title="Dashboards">
            <Link
              className={`${styles.darkMobileMenuItem} pl-8`}
              to="/politicians"
            >
              Current Politicians
            </Link>
            <Link
              className={`${styles.darkMobileMenuItem} pl-8`}
              to="/retiredpoliticians"
            >
              Former Politicians
            </Link>
            <Link
              className={`${styles.darkMobileMenuItem} pl-8`}
              to="/challengers"
            >
              Challengers
            </Link>
            <Link
              className={`${styles.darkMobileMenuItem} pl-8`}
              to="/advocacy"
            >
              Advocacy Group
            </Link>
            <Link
              className={`${styles.darkMobileMenuItem} pl-8`}
              to="/industry"
            >
              Industries
            </Link>
          </Accordion> */}
          {/* <Link className={`${styles.darkMobileMenuItem} pl-5`} to="/data">
            Data
          </Link>
          <Link className={`${styles.darkMobileMenuItem} pl-5`} to="/about">
            About
          </Link> */}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
