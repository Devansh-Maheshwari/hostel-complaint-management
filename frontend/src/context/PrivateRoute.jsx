import React from "react";
import Dashboard from "../pages/Dashboard";
import {Navigate} from "react-router-dom"
import { useAuth } from "./AuthProvider";

const PrivateRoute=()=>{
    const {authToken} =useAuth();
    console.log(authToken);
    return authToken?(
        <Dashboard/>
    ):(
        <Navigate to="/login"/>
        // <Dashboard></Dashboard>
    )
}
export default PrivateRoute;