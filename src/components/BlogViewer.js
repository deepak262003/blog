import { useLocation } from "react-router-dom";
import { Markup } from "interweave";
import "../styles/interweave.css";
import NavigationBar from "./NavigationBar";

const BlogViewer = () => {
  const location = useLocation();

    return (
        <>
            <NavigationBar/> <br/> <br/>
      <div className="markup_parent">
      <div className="markup_title">
        <h1>{location.state.content[0]}</h1>
      </div>
      <div className="markup">
        <Markup content={location.state.content[1]} />
      </div>
      <div className="markup_footer">
              <h3>Posted by</h3>
              <p>{location.state.content[2]}</p>
              <p>{location.state.content[3]}</p>
      </div>
            </div>
       </>    
  );
};

export default BlogViewer;
