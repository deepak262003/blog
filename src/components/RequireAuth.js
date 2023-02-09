
import { useLocation, Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
    const isAuth = localStorage.getItem("isAuth");
    const location = useLocation();
    
    return (
        isAuth ? children : (<>{alert("not authorized..Kindly login")};<Navigate to="/" replace={location}/></>)
    );
}

export default RequireAuth;