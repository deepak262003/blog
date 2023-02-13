import React, { useRef, useState } from "react";
import "../styles/login.css";
import { useAuth } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { SignUp,verifyEmail} = useAuth();
  var status ="";
  const [loading, setLoading] = useState(false);

  const passwordChecker = (e) => {
    const d = e.target;
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      d.setCustomValidity("password do not match..");
      console.log(passwordRef.current);
      d.reportValidity();
    } else {
      d.setCustomValidity("matched..");
      d.reportValidity();
    }
  };

  const passwordHandler = (e) => {
    const d = e.target;
    if (d.validity.tooShort) {
      d.setCustomValidity("password must be be of 8 - 12 Characters");
      d.reportValidity();
    }
  };

  async function submitListener(e) {
    e.preventDefault();
    try {
      await SignUp(emailRef.current.value, passwordRef.current.value);
      setLoading(true);
    } catch (error) {
      switch (error.code) {
        case ("auth/email-already-in-use"): {
          status = "Email already exists";
          alert(status);
          break;
        }
        default: {
          status = "Error creating account";
          alert(status);
          break;
        }
      }
      setLoading(true);
    }
    console.log(status)
  }

  return (
    <div className="parent_">
      <div className="container">
        <ul className="list">
          <li>
            <h2>Sign up</h2>
          </li>
          <form>
            <li>
              <input
                type="email"
                name="mail"
                placeholder="Enter Email Id"
                ref={emailRef}
                required
              />
            </li>
            <li>
              <input
                type="text"
                name="password1"
                placeholder="Enter Password"
                maxLength={12}
                minLength={8}
                ref={passwordRef}
                onChange={passwordHandler}
              />
            </li>
            <li>
              <input
                type="text"
                name="password2"
                placeholder="Confirm Password"
                maxLength={12}
                ref={confirmPasswordRef}
                onChange={passwordChecker}
              />
            </li>
            <li>
              <input
                type="submit"
                value="Register"
                onClick={submitListener}
                disabled={loading}
              />
            </li>
          </form>
          <li>
            Not registered ? <Link to="/"> Sign in </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SignUp;
