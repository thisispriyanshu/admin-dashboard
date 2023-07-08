import React from "react";
import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        margin: "auto",
      }}>
      <h3>Page Not Found. 404</h3>
      <NavLink to="/">
        <button className="btn btn-danger">Go back to Home...</button>
      </NavLink>
    </div>
  );
};

export default ErrorPage;
