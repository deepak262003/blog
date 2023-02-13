import { collection, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../Firebase/Firebase";
import NavigationBar from "./NavigationBar";
import "../styles/AllPosts.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { auth } from "../Firebase/Firebase";


const AllPosts = () => {
    const [blogList, setBlogList] = useState([]);
    const [tempList, setTempList] = useState([]);
    const [loading, setLoading] = useState(false);
    const collectionsRef = collection(db, "posts");
    const [back, setBack] = useState(true);
    const navigate = useNavigate(); 
    let blogTemp = [];
    let data = {};

    const getPosts = async () => {
        setLoading(false);
        
            data = await getDocs(collectionsRef);
        let blogs = (data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        blogTemp = blogs;
        console.log(blogTemp);
        setBlogList(blogs);
        setTempList(blogs);
        setLoading(true);
        
    };

    useEffect(() => {
        getPosts();
    }, []);


    const filterBlogsByTitle = (param) => {
        console.log("hellooooooo");
        console.log(param);
        console.log(blogTemp);
        let filteredData = blogList.filter((blog) => blog.title.includes(param));
        console.log(filteredData);
        setTempList(filteredData);
    }

    const blogViewer = (...param) => {
        console.log(param);
        navigate("/viewPosts", { state: { content: param } });
    };

    
    const redirect = () => {
        navigate('/editor');
    }

    return (
        <>
            <NavigationBar  title={filterBlogsByTitle} getPosts={getPosts} back={back} />
            { 
            (loading&&tempList.length==0)?(<><br/><br/><div id="noPosts"><h1>No posts found</h1><br/><button onClick={redirect}>Start your new Blog</button></div></>):

            tempList.map((blogs) => {
                return (
                    <>
                        <br />
                        <br />
                        <div className="blog_container"  onClick={()=>blogViewer(blogs.title,blogs.blog,blogs.author.name,blogs.author.date_publish)}  key={blogs.id}>
                            <h2 id="blog_title">{blogs.title}</h2>
                            <p id="blog_content">{blogs.blog_text}</p>
                            <div id="blog_author_container">
                                <b id="blog_author">posted by {blogs.author.name} on {blogs.author.date_publish}</b>
                            </div>
                        </div>
                      
                    </>
                );
            }
            )
        }</>
    )
}
export default AllPosts;
