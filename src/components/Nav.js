import React from "react";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/collapse";
import { NavLink, useNavigate } from "react-router-dom";

const Nav = ({ Toggle, MobileToggle, isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const removeToken = () => {
    localStorage.removeItem("@token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-white bg-white">
      <i className="navbar-brand bi bi-justify-left fs-4" onClick={Toggle}></i>
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <i className="bi bi-person-circle" onClick={MobileToggle}></i>
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
          {isLoggedIn ? (
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="dropdownId"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ backgroundColor: "#0b2a81", color: "white" }}>
                Account
              </a>
              <div className="dropdown-menu" aria-labelledby="dropdownId">
                <NavLink
                  to="/profile"
                  style={{ textDecoration: "none", color: "inherit" }}
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}>
                  <button className="dropdown-item">Profile</button>
                </NavLink>

                <button className="dropdown-item" onClick={removeToken}>
                  Log out
                </button>
              </div>
            </li>
          ) : (
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
