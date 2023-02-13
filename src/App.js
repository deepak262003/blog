import SignUp from "./components/SignUp";
import AuthProvider from "./contexts/AuthProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogDashboard from "./components/NavigationBar";
import Login from "./components/Login";
import BlogEditor from "./components/BlogEditor";
import UpdateProfile from "./components/UpdateProfile";
import RequireAuth from "./components/RequireAuth";
import AllPosts from "./components/AllPosts";
import BlogViewer from "./components/BlogViewer";
import FilteredPosts from "./components/FilteredPosts";

const App = () => {
  
  return (
    <BrowserRouter>
      <AuthProvider >
        <div className="parent">
          <Routes>
            <Route path="/AllPosts" element={<RequireAuth><AllPosts /></RequireAuth>}></Route>
            <Route path="/filteredPosts" element={<RequireAuth><FilteredPosts/></RequireAuth>}></Route>
            <Route path="/dashboard" element={<RequireAuth><AllPosts/></RequireAuth>}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route exact path="/" element={<Login />}></Route>
            <Route path="/editor" element={<RequireAuth><BlogEditor /></RequireAuth>}></Route>
            <Route path="/updateProfile" element={<RequireAuth><UpdateProfile /></RequireAuth>}></Route>
            <Route path="/viewPosts" element={<RequireAuth><BlogViewer/></RequireAuth>}></Route>
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};
export default App;
