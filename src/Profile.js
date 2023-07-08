import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import layout from "./layout";
import { auth } from "./firebase";

const Profile = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const resource = layout[0].resource;
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user details when the component mounts
    if (isLoggedIn) {
      const currentUser = auth.currentUser;
      setUser(currentUser);
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    // Clear the token and set the login status to false
    localStorage.removeItem("@token");
    setIsLoggedIn(false);
    // Redirect to the login page or any other desired page
    navigate("/");
  };

  if (!isLoggedIn) {
    return <p>You are not logged in.</p>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "20px" }}>
      <h4>Profile Details:</h4>
      {user && (
        <>
          <p>
            <strong>Name:</strong> {user.displayName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Last Login:</strong> {user.metadata.lastSignInTime}
          </p>
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt="Profile"
              style={{ width: "100px", height: "100px" }}
            />
          )}
        </>
      )}
      <div>
        <button
          className="btn btn-primary m-2"
          onClick={() => navigate(`/${resource}/`)}>
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Profile;
