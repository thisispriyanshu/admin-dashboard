import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Main from "./Main";
import "../styles/style.css";
import layout from "../layout";
import { Link, NavLink, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const Home = ({ isLoggedIn, setIsLoggedIn }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const { resource } = useParams();
  let resultant_layout = {};
  for (var i = 0; i < layout.length; i++) {
    if (layout[i].resource == resource) resultant_layout = layout[i];
  }
  const [toggle, setToggle] = useState(false);
  const [mobileToggle, setMobileToggle] = useState(false);
  const Toggle = () => {
    setToggle(!toggle);
  };
  const MobileToggle = () => {
    setMobileToggle(!mobileToggle);
  };
  useEffect(() => {
    Toggle();
    setIsLoggedIn(true);
  }, [isTabletOrMobile]);
  return (
    <div className="row">
      {toggle && (
        <div className="col-4 col-md-2  bg-white vh-100">
          <div className="bg-white sidebar p-2">
            <NavLink
              to={`/${resource}/`}
              style={{ textDecoration: "none", color: "inherit" }}>
              <div
                className="m-2"
                style={{ color: "#0b2a81", fontWeight: "bold" }}>
                <i className="bi bi-music-note me-2 fs-5"></i>
                <span className="brand-name fs-4">Singtico</span>
              </div>
            </NavLink>
            <hr className="text-dark" />
            <div className="list-group list-group-flush">
              {layout.map((data, i) => {
                return (
                  <Link
                    to={`/${data.resource}`}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      boxShadow: "inherit",
                    }}>
                    <a
                      className="list-group-item py-2"
                      value={data.resource}
                      key={i}>
                      <i className={"bi " + data.icon + " fs-4 me-3"}></i>
                      <span className="fs-5">{data.resource}</span>
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
      <div className="col px-0">
        <div>
          <Nav
            Toggle={Toggle}
            MobileToggle={MobileToggle}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          />
          <br />
          <Main resultant_layout={resultant_layout} isLoggedIn={isLoggedIn} />
        </div>
      </div>
    </div>
  );
};

export default Home;
