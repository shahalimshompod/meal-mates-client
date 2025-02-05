import { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContextProvider";
import { Navigate, useLocation } from "react-router-dom";

const ProtectPrivateRoutes = ({children}) => {
    const {user, loading} =useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return (
            <div className="flex flex-col items-center justify-between">
                <p className="hidden">.</p>
                <span className="h-screen loading loading-spinner text-error"></span>
            </div>
        )
    }
    if(user){
        return children;
    }

    return (
        <div>
            <Navigate state={location.pathname} to="/login"></Navigate>
        </div>
    );
};

export default ProtectPrivateRoutes;