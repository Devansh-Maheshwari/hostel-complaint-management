import React, { useState, useEffect } from "react";
import { GetAuthHeader } from "../utils/header";
import { Link } from "react-router-dom";
import clsx from "clsx";
import ComplaintForm from "./ComplaintForm";

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

const formatTimestamp1 = (timestamp) => {
  const date = new Date(timestamp);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

const Complaint = () => {
  const [complaints, setComplaints] = useState([]);

  const getComplaints = async () => {
    try {
      const response = await fetch("https://hostel-complaint-management-2.onrender.com/complaints", {       //is completed parameter will be set by student and if set true then compelted button else not completed button warden can delete the complain 
        method: "GET",                                                         //get complaint ->/complaints->gives array complaint of user and /complanitby id will chnage the parameter 
        headers: GetAuthHeader(),
      });
      const jsonData = await response.json();
      console.log("line 39 ",jsonData)
      setComplaints(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleApproval = async (complaint_id) => {
    try {
      console.log("complaint-id",complaint_id)
      
      const response = await fetch(
        `http://localhost:4000/complaints/${complaint_id}`,
        {
          method: "POST", // Changed to PUT
          headers: GetAuthHeader(),
        }
      );
      console.log(response.ok)
      if (response.ok) {
        getComplaints(); // Refresh complaints list after approval
        console.log("after fetch");
      }
      else{
        console.log("error")
      }
    } catch (err) {
      console.error(err.message);
      console.log("error")
    }
  };

  useEffect(() => {
    getComplaints();
    
  }, []);
  const refreshComplaints = () => {
    getComplaints();
  };

  console.log(complaints);

  return (
    <div className="bg-gray-100 h-screen p-4 sm:p-8 md:p-10 ">
      <h1 className="text-2xl font-bold mt-20 mb-4 ">Complaints</h1>
      <div className="mb-5">
      <Link to="/file-complaint" className="text-blue-500 underline ">
        File a Complaint
      </Link>
      </div>
      {complaints.length === 0 ? (
        <p className="ml-4 mt-2 text-gray-600 text-xl">
          No complaints registered yet.
        </p>
      ) : ( 
        <div className="container mx-auto grid gap-8 md:grid-cols-3 sm:grid-cols-1">
          {complaints.map((complaint) => (
            <div
              key={complaint.complaint_id}
              className="relative flex h-full flex-col rounded-md border border-gray-200 bg-white p-2.5 hover:border-gray-400 sm:rounded-lg sm:p-5"
            >
              <div className="text-lg mb-2 font-semibold text-gray-900 hover:text-black sm:mb-1.5 sm:text-2xl">
                {complaint.name}
              </div>
              <p className="text-sm">
                Created on {formatTimestamp1(complaint.created_at)}
              </p>
              <p className="mb-4 text-sm">
                {complaint.assigned_at
                  ? `Completed on ${formatTimestamp(complaint.assigned_at)}`
                  : null}
              </p>
              
          <p className="text-sm text-gray-400">Category: {complaint.category}</p>
          <div className="flex flex-row ">
          <p className="text-sm text-gray-400 mr-5">Availabiltiy: {complaint.availability}</p>
          <p className="text-sm text-gray-400 mr-5">Timings: {complaint.timing}</p>
          </div>
          
              <div
                className="text-md leading-normal text-gray-400 sm:block overflow-hidden"
                style={{ maxHeight: "100px" }}
              >
                {complaint.description}
              </div>
              <button
                className={clsx(
                  "group flex w-1/3 mt-3 cursor-pointer items-center justify-center rounded-md px-4 py-2 text-white transition text-sm",
                  complaint.is_completed ? "bg-green-500" : "bg-red-600"
                )}
                onClick={() => {handleApproval(complaint._id);}}
              >
                <span className="group flex w-full items-center justify-center rounded py-1 text-center font-bold">
                  {complaint.is_completed ? "Completed" : "Not Completed"}
                </span>
              </button>
            </div>
          ))}
        </div>
      )}
      {/* <ComplaintForm onFormSubmit={refreshComplaints} /> */}
    </div>
  );
};

export default Complaint;
