import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import "@szhsin/react-menu/dist/index.css";
// import "@szhsin/react-menu/dist/transitions/slide.css";
import styles from "../styles/HeaderMain.module.css";

export function HeaderMain() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDesktop, setDesktop] = useState(window.innerWidth > 1024);

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
        className={`${styles.navbarContainer} flex relative z-10 w-full h-20 p-10`}
      >
        <div className="w-full text-white flex pl-5 flex-row">
          <div className="w-full flex flex-row items-center justify-between">
            <Link
              className={`text-3xl font-semibold lg:pl-6 flex flex-row items-center ${styles.navButton}`}
              to="/">
              Parking Lot Manager
            </Link>
            <div className="flex flex-row items-center space-x-16">
                <Link
                    className={`text-3xl lg:pl-6 flex flex-row items-center ${styles.navButton}`}
                    to="/">
                    Lots
                </Link>
                <Link
                    className={`text-3xl lg:pl-6 flex flex-row items-center ${styles.navButton}`}
                    to="/">
                    Managers
                </Link>
            </div>
            
            {!isDesktop ? (
              <button onClick={handleClick}>
                {/* {!menuOpen ? (
                  <MdMenu
                    size="1.5em"
                    color="#EFEFEF"
                    style={{ marginRight: "1.25em" }}
                  />
                ) : (
                  <MdClose
                    size="1.5em"
                    color="#EFEFEF"
                    style={{ marginRight: "1.25em" }}
                  />
                )} */}
              </button>
            ) : (
              <></>
            )}
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
          <Link className={`${styles.darkMobileMenuItem} pl-5`} to="/data">
            Data
          </Link>
          <Link className={`${styles.darkMobileMenuItem} pl-5`} to="/about">
            About
          </Link>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
