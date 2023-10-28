import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({children}) => {
    const user = useSelector((state) => state.user.user)
    const navigate = useNavigate();

    useEffect(() => {
        console.log("ProtectedRoute: user", user);
        if (user !== null) {
            navigate("/");
        }
    }, [user]); 

    return children
}

export default ProtectedRoute;