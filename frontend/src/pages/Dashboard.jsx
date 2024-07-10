import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Complaint from "./Complaint";
import WardenComplaint from "./WardenComplaint";
import { GetAuthHeader } from "../utils/header";
export default function  Dashboard(){

     const [userType,setUserType]=useState("");
     useEffect(()=>{
        const fetchUserType = async () => {
            try {
              const response = await fetch("https://hostel-complaint-management-2.onrender.com/userType", {
                method: "GET",
                headers: GetAuthHeader(),
              });
      
              if (response.ok) {
                const data = await response.json();
                setUserType(data.userType);
                console.log("usertype=",data)
              } else {
                console.error('Failed to fetch user type');
              }
            } catch (error) {
              console.error(error.message);
            }
          };
      
          fetchUserType();
        }, []); 
      
        return(
            <>
            <Navbar/>
            {userType==="student"?<Complaint/>:null}
            {userType==="warden"?<WardenComplaint/>:null}
            </>
        )
    }