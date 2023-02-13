import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import "../styles/login.css";


const Login = () => {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const { Login,passwordReset } = useAuth();
  const navigate = useNavigate();

  async function submitListener(e) {
    e.preventDefault();
    try {
      console.log("hello");
      await Login(emailRef.current.value, passwordRef.current.value);
      setLoading(true);
    } catch (error) {
      alert("oops.. unable to login.. check in credentials");
      return false;
    }
    setLoading(false);
    navigate('/dashboard');
  }

  const passwordHandler = async () => {
    
    await passwordReset(emailRef.current.value);
  }

  return (
    <div className="parent_">
      <div className="container">
        <ul className="list">
          <li>
            <h2>Login</h2>
          </li>
          <form onSubmit={submitListener}>
            <li>
              <input
                type="text"
                name="mail"
                placeholder="Enter Email Id"
                ref={emailRef}
              />
            </li>
            <li>
              <input
                type="text"
                name="password"
                placeholder="Enter Password"
                ref={passwordRef}
              />
            </li>
            <li>
              <input type="Submit" value="Login" disabled={loading} />
            </li>
          </form>
          <li>
            Not registered ? <Link to="/signup"> Sign up </Link>
          </li>
          <li>
            <i onClick={passwordHandler}>Forgot password</i>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Login;
