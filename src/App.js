import { useState } from "react";
import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import RedirectPage from "./RedirectPage";
import Profile from "./Profile";
import SignUp from "./pages/SignUp";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="container-fluid bg-white min-vh-100">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<SignUp />}
          />
          {/* <Route
            path="/:resource"
            element={
              <Home setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
            }
          />
          <Route
            path="/profile"
            element={<Profile isLoggedIn={isLoggedIn} />}
          /> */}
          <Route path="*" Component={ErrorPage} />
        </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;
