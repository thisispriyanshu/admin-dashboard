import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, firebase } from "./firebase";
import layout from "./layout.js";

const RedirectPage = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const resource = layout[0].resource;

  useEffect(() => {
    const token = localStorage.getItem("@token");
    if (token) {
      setIsLoggedIn(true);
      navigate(`/${resource}/`);
    }
  }, [navigate, resource, setIsLoggedIn]);

  async function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    try {
      const result = await auth.signInWithPopup(provider);
      const token = await auth?.currentUser?.getIdToken(true);

      if (token) {
        localStorage.setItem("@token", token);
        setIsLoggedIn(true);
        navigate(`/${resource}/`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h3 className="m-4">Welcome to Singtico Dashboard</h3>
      <button
        onClick={googleLogin}
        className="btn btn-warning"
        style={{ margin: "30px", width: "200px" }}>
        <i className="bi bi-google m-2"></i>
        Login with Google
      </button>
      {/* <button
        className="btn"
        style={{
          margin: "30px",
          width: "200px",
          backgroundColor: "#0b2a81",
          color: "white",
        }}
        onClick={() => navigate(`/${resource}/`)}>
        Go to dashboard.
      </button> */}
    </div>
  );
};

export default RedirectPage;
