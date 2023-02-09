import { useState, useEffect } from "react";
import {
     collection, deleteDoc,doc, getDocs
} from "firebase/firestore";
import {auth,db } from "../Firebase/Firebase"

const Blogs = () => {
    const [blogs,setBlog] = useState([]);
    const [loading, setLoading] = useState(false);
    const collectionRef = collection(db, "posts");
 
    const getPosts = async() =>{
        setLoading(false);
        const data = await getDocs(collectionRef);
    }

    useEffect(() = {
        getPosts();
    })

    return (
        <div></div>
    )

}

export default Blogs;