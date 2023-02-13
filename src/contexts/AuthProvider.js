import React, { useContext, useState, useEffect } from "react";
import { auth } from "../Firebase/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification
} from "firebase/auth";
import { signOut } from "firebase/auth";
import { deleteDoc,doc } from "firebase/firestore";
import { db } from "../Firebase/Firebase";

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
  
  const deleteBlog = async(id) =>{
  const docRef = doc(db, 'posts', id);
    await deleteDoc(docRef);
  }

  const passwordReset = (email) => {
    try {
      var isSent = sendPasswordResetEmail(auth, email);
    }
    catch (error) {
      alert(error.code);
    }
    if (isSent) {
      alert("password reset email sent...")
    }
  }

  const verifyEmail = () => {
    let isEmailVerified = sendEmailVerification(auth.currentUser);
    return isEmailVerified;
  }

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
    isAuth,
    deleteBlog,
    passwordReset,
    verifyEmail
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
