import React, { useEffect, useRef, useState } from "react";
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import NavigationBar from "./NavigationBar";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../Firebase/Firebase";
import { useNavigate } from "react-router-dom";
  
import "../styles/editor.css";
import { async } from "@firebase/util";

const BlogEditor = () => {
  const { quill, quillRef } = useQuill();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const[text, setText] = useState("");
  const collectionRef = collection(db, "posts");
  
  const titleRef = useRef();
  const authorRef = useRef();
  const navigate = useNavigate();

  const publishHandler = async() => {
    if (title === "" || content === "") {
      alert("fields cannot be empty...");
      return false;
    }
    else {
      try {
        await addDoc(collectionRef,
          {
            title: title,
            blog: content,
            blog_text: text,
            author: {
              name: author,
              id: auth.currentUser.uid,
              date_publish: new Date().toLocaleDateString()
            }
          }
        )
      }
       catch(error) {
        alert(error.code);
        return false;
      }
    }
    alert("blog published successfully...");
    navigate("/dashboard");
  };

  const changeHandler = () => {
    setTitle(titleRef.current.value);
    setAuthor(authorRef.current.value);
    setContent(quill.root.innerHTML);
    setText(quill.getText());
    alert("changes saved successfully");
  }

  return (
    <div >
      <NavigationBar back={false } />
      <br />
      <br />
      <div className="title">
        <input type="text" placeholder="Enter Title" ref={titleRef}></input> 
        <input type="text" placeholder="Enter Author Name" ref={authorRef}></input>
      </div>
      <div className="Editor">
        <div ref={quillRef} >        
        </div>
        <div id="container_publish"><button id="publish" onClick={changeHandler} > save changes</button><button id="publish" onClick={publishHandler} > Publish</button></div>
      </div>
    </div>
      
  );

}

export default BlogEditor;
