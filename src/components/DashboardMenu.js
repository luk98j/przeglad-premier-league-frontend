import React, { useState, useEffect, Profiler } from "react";
import {Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import AuthService from "../services/auth.service";
import SwitchAndRoute from "../static/SwitchAndRoute";
import menuHeaderForAllUsers from "../static/MenuTabs";
import menuHeaderForAuthUsers from "../static/MenuTabsForAuthUsers";

const DashboardMenu = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  
  useEffect(() => {
    console.log(currentUser)
    setCurrentUser(AuthService.getCurrentUser());
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
      {menuHeaderForAllUsers.map((key) => {
        let keyName = Object.keys(key).toString();
        return (
          <Link to={keyName} className="navbar-brand">
            {key[keyName]}
          </Link>
        )}
      )}
        

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            {/* <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li> */}
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <SwitchAndRoute/>
      </div>
    </div>
  );
};

export default DashboardMenu