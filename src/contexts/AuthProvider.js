import React, { useContext, useState, useEffect } from "react";
import { auth } from "../Firebase/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { signOut } from "firebase/auth";

const AuthContext = React.createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("Account");
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  const SignUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const Login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password).then(() => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
    });
  };

  const SignOut = () => {
    return signOut(auth).then((result) => {
      localStorage.clear();
      setIsAuth(false);
      alert("you are successfully logged out...")
      window.location.pathname = "/";    
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      setCurrentUser(user);
    });
  });

  const value = {
    currentUser,
    SignUp,
    Login,
    SignOut,
    isAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {" "}
      {!loading && children}{" "}
    </AuthContext.Provider>
  );
};

export { useAuth };
export default AuthProvider;
