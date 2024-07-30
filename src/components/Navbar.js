import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Headroom from "react-headroom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loggedStatus } from "../features/user/user";
export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.logStatus.name);
  const role = useSelector((state) => state.logStatus.role);
  const isCr = useSelector((state) => state.logStatus.isCr);
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const location = useLocation();
  useEffect(() => {}, [location]);
  const links = document.querySelectorAll(".items");
  links.forEach((e) => {
    e.addEventListener("click", () => {
      setIsOpen(false);
    });
  });
  const logout = () => {
    dispatch(
      loggedStatus({
        logged: false,
        authToken: "",
        name: "",
        role: "",
        email: "",
      })
    );
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    navigate("/");
    window.history.pushState(null, null, window.location.href);
    window.addEventListener("popstate", () => {
      window.history.pushState(null, null, window.location.href);
    });
  };
  return (
    <>
      <Headroom downTolerance={10} upTolerance={10} pinStart={50}>
        <header
          className="main"
          style={
            location.pathname.startsWith("/user/verify")
              ? { display: "none" }
              : { display: "block" }
          }
        >
          <nav className="header header-close" id="header">
            <div className="Logos">
              <div className="burger" onClick={toggleMenu}>
                {isOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    className="menuIcons"
                  >
                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="menuIcons"
                  >
                    <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                  </svg>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <Link to="/">
                  <img
                    src="https://media.licdn.com/dms/image/D560BAQGeX5IypKPgKA/company-logo_200_200/0/1714503367832/src_rgukt_rkvalley_logo?e=2147483647&v=beta&t=VaD731Pnd5Lt2gtyglJxyOJwUvjsOATqQCeXi6k-qS0"
                    alt=""
                    id="ClubLogo"
                  />
                </Link>
                <h3 style={{ color: "white" }}>SRC</h3>
              </div>
            </div>
            <div
              className={`menu_items ${isOpen ? "open" : "closed"}`}
              id="toggle-navbar"
            >
              <Link
                to="/"
                className="items"
                id={location.pathname === "/" ? "click" : ""}
              >
                <svg
                  className="Icons"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                </svg>
                Home
              </Link>

              <Link
                to="/About"
                className="items"
                id={location.pathname === "/About" ? "click" : ""}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  className="Icons"
                >
                  <path d="M48 48h88c13.3 0 24-10.7 24-24s-10.7-24-24-24H32C14.3 0 0 14.3 0 32V136c0 13.3 10.7 24 24 24s24-10.7 24-24V48zM175.8 224a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm-26.5 32C119.9 256 96 279.9 96 309.3c0 14.7 11.9 26.7 26.7 26.7h56.1c8-34.1 32.8-61.7 65.2-73.6c-7.5-4.1-16.2-6.4-25.3-6.4H149.3zm368 80c14.7 0 26.7-11.9 26.7-26.7c0-29.5-23.9-53.3-53.3-53.3H421.3c-9.2 0-17.8 2.3-25.3 6.4c32.4 11.9 57.2 39.5 65.2 73.6h56.1zm-89.4 0c-8.6-24.3-29.9-42.6-55.9-47c-3.9-.7-7.9-1-12-1H280c-4.1 0-8.1 .3-12 1c-26 4.4-47.3 22.7-55.9 47c-2.7 7.5-4.1 15.6-4.1 24c0 13.3 10.7 24 24 24H408c13.3 0 24-10.7 24-24c0-8.4-1.4-16.5-4.1-24zM464 224a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm-80-32a64 64 0 1 0 -128 0 64 64 0 1 0 128 0zM504 48h88v88c0 13.3 10.7 24 24 24s24-10.7 24-24V32c0-17.7-14.3-32-32-32H504c-13.3 0-24 10.7-24 24s10.7 24 24 24zM48 464V376c0-13.3-10.7-24-24-24s-24 10.7-24 24V480c0 17.7 14.3 32 32 32H136c13.3 0 24-10.7 24-24s-10.7-24-24-24H48zm456 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H608c17.7 0 32-14.3 32-32V376c0-13.3-10.7-24-24-24s-24 10.7-24 24v88H504z" />
                </svg>
                About Us
              </Link>
              <Link
                to="/Projects"
                className="items"
                id={location.pathname === "/Projects" ? "click" : ""}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  className="Icons"
                >
                  <path d="M128 0C92.7 0 64 28.7 64 64V288H19.2C8.6 288 0 296.6 0 307.2C0 349.6 34.4 384 76.8 384H320V288H128V64H448V96h64V64c0-35.3-28.7-64-64-64H128zM512 128H400c-26.5 0-48 21.5-48 48V464c0 26.5 21.5 48 48 48H592c26.5 0 48-21.5 48-48V256H544c-17.7 0-32-14.3-32-32V128zm32 0v96h96l-96-96z" />
                </svg>
                Projects
              </Link>
              <Link
                to="/Events"
                className="items event-name-for-click"
                id={location.pathname.startsWith("/Events") ? "click" : ""}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="Icons"
                >
                  <path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z" />
                </svg>
                Events
              </Link>
              {!useSelector((state) => state.logStatus.logged) ? (
                <Link
                  to="/Auth/Login"
                  className="items"
                  id={
                    location.pathname === "/Auth/Login" ||
                    location.pathname === "/Auth/Signin" ||
                    location.pathname === "/Admin"
                      ? "click"
                      : ""
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="Icons"
                  >
                    <path d="M96 128a128 128 0 1 0 256 0A128 128 0 1 0 96 128zm94.5 200.2l18.6 31L175.8 483.1l-36-146.9c-2-8.1-9.8-13.4-17.9-11.3C51.9 342.4 0 405.8 0 481.3c0 17 13.8 30.7 30.7 30.7H162.5c0 0 0 0 .1 0H168 280h5.5c0 0 0 0 .1 0H417.3c17 0 30.7-13.8 30.7-30.7c0-75.5-51.9-138.9-121.9-156.4c-8.1-2-15.9 3.3-17.9 11.3l-36 146.9L238.9 359.2l18.6-31c6.4-10.7-1.3-24.2-13.7-24.2H224 204.3c-12.4 0-20.1 13.6-13.7 24.2z" />
                  </svg>
                  Login
                </Link>
              ) : (
                <>
                  <Link
                    className="logout user-menu"
                    id={
                      location.pathname.startsWith("/Admin") ||
                      location.pathname.startsWith("/CR/feedback") ||
                      location.pathname.startsWith("/profile/Arjuna")
                        ? "click"
                        : ""
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="logout-icon"
                    >
                      <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
                    </svg>

                    <span>
                      {username}{" "}
                      <span id="user-name-info-badge">
                        {(role === "admin" || role === "Coordinator") &&
                          "(" + role + ")"}
                      </span>
                    </span>
                  </Link>
                  <div id="user-options">
                    <ul>
                      {role === "admin" ? (
                        <li className="items">
                          <Link to="/Admin">Admin</Link>
                        </li>
                      ) : (
                        ""
                      )}
                      {isCr ? (
                        <li className="items">
                          <Link to="/CR/feedback">CR feedback</Link>
                        </li>
                      ) : (
                        ""
                      )}
                      <li className="items">
                        <Link to={`/profile/${username}`}>My profile</Link>
                      </li>
                      <li
                        style={{ cursor: "pointer" }}
                        onClick={logout}
                        className="logout items"
                      >
                        <Link>Logout</Link>
                      </li>
                    </ul>
                  </div>
                </>
              )}

              {/* <form className="searchBox">
                <input
                  type="search"
                  placeholder="Search in SRC"
                  id="searchField"
                />
                <button type="submit" className="searchBtn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="Icons"
                    id="searchIcon"
                  >
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                  </svg>
                </button>
              </form> */}
            </div>
          </nav>
        </header>
      </Headroom>
    </>
  );
}
