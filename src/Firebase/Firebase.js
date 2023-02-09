import {initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/* const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
} */

 const firebaseConfig = {
    apiKey: "AIzaSyBAnhWgpxi_rNGaGF3k77Tx04FE6rBIZXQ",
    authDomain: "blog-firebase-dd900.firebaseapp.com",
    projectId: "blog-firebase-dd900",
    storageBucket: "blog-firebase-dd900.appspot.com",
    messagingSenderId: "309291820009",
    appId: "1:309291820009:web:4a90e04cc31cd5867ba178",
    measurementId: "G-F1JJRCLHVB"
  }; 

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export const auth = getAuth(app)
export { db };
export default app;