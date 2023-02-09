import React, { useState } from "react";
import "../styles/navigationBar.css";
import "../styles/dropdown.css";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

const NavigationBar = () => {
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const { SignOut} = useAuth();

  const logoutHandler = () => {
    SignOut();
  }

  return (
    <div className="nav">
      <ul className="nav__ul">
        <li id="nav__li">Blog home</li>
        <li id="nav__li">Your posts</li>
        <li id="nav__li"><Link to="/editor" id="link">Add Blog</Link></li>
        <li id="logout" onClick={logoutHandler}>Logout</li>
        <li id="name">
          <div className="dropdown">
            <p> {currentUser.email}</p>
            <div className="dropdown-content">
              <a href="#">View profile</a>
              <a href="#">Manage blog</a>
              <a href="#">Reset password</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default NavigationBar;
