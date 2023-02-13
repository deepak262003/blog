import React, { useState } from "react";
import "../styles/navigationBar.css";
import "../styles/dropdown.css";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

const NavigationBar = (props) => {
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const { SignOut,passwordReset } = useAuth();
  const [title, setTitle] = useState();
  const navigate = useNavigate();

  const logoutHandler = () => {
    SignOut();
  };

  return (
    <div className="nav">
      <ul className="nav__ul">
        <li id="nav__li" onClick={props.getPosts}>
          <Link to="/AllPosts" id="link">
            Blog home
          </Link>
        </li>
        <li
          id="nav__li"
        >   <Link to="/FilteredPosts" id="link">
        Your Blog
      </Link>
        </li>
        <li id="nav__li">
          <Link to="/editor" id="link">
            Add Blog
          </Link>
        </li>
        {props.back && (
          <li id="nav__li">
            <input
              type="text"
              id="search"
              placeholder="Search title"
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </li>
        )}
        {props.back && (
          <li id="nav__li">
            <input
              type="button"
              id="search_but"
              placeholder="Search title"
              onClick={(e) => {
                props.title(title);
              }}
              value="search"
            ></input>
          </li>
        )}
        <li id="logout" onClick={logoutHandler}>
          Logout
        </li>
        <li id="name">
          <div className="dropdown">
            <p> {currentUser.email}</p>
            <div className="dropdown-content">
              <a href="#">View profile</a>
              <a onClick={()=>{props.delete(true)}}>Delete blogs</a>
              <a onClick={passwordReset}>Reset password</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default NavigationBar;
