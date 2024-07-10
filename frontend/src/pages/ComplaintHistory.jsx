import React, { useState, useEffect } from "react";
import { GetAuthHeader } from "../utils/header";
import clsx from "clsx";
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

const ComplaintHistory = () => {
  const [complaints, setComplaints] = useState([]);
  const [expanded, setExpanded] = useState({});
  
  const toggleReadMore = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const getComplaintHistory = async () => {
    try {
      const response = await fetch("https://hostel-complaint-management-2.onrender.com/complaints/history", {       
        method: "GET",                                                         
        headers: GetAuthHeader(),
      });
      const jsonData = await response.json();
      setComplaints(jsonData);
      console.log(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getComplaintHistory();
  }, []);

  return (
    <div className="bg-gray-100 h-screen p-4 sm:p-8 md:p-10">
      <h1 className="text-2xl font-bold mb-8">Complaint History</h1>
      {complaints.length === 0 ? (
        <p className="ml-4 mt-2 text-gray-600 text-xl">
          No complaint history available.
        </p>
      ) : ( 
        <div className="container mx-auto grid gap-8 md:grid-cols-3 sm:grid-cols-1">
          {complaints.map((complaint) => {
            const isLongText = complaint.description.length > 45;
            const isExpanded = expanded[complaint._id] || false;
           return(
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
                <p className="text-sm text-gray-400 mr-5">Availability: {complaint.availability}</p>
                <p className="text-sm text-gray-400 mr-5">Timings: {complaint.timing}</p>
              </div>
              <div
                className="text-md leading-normal mt-1 text-gray-600 sm:block overflow-hidden"
                >
                {isExpanded || !isLongText
                    ? complaint.description
                    : `${complaint.description.substring(0,45)}...`}
                  {isLongText && (
                    <span className="text-blue-500 underline cursor-pointer" onClick={() => toggleReadMore(complaint._id)}>
                      {isExpanded ? " Show less" : " Read more"}
                    </span>
                  )}
              </div>
              <button
                className={clsx(
                  "group flex w-1/3 mt-3 cursor-pointer items-center justify-center rounded-md px-4 py-2 text-white transition text-sm",
                  complaint.is_completed ? "bg-green-500" : "bg-red-600"
                )}
              >
                <span className="group flex w-full items-center justify-center rounded py-1 text-center font-bold">
                  {complaint.is_completed ? "Completed" : "Not Completed"}
                </span>
              </button>
            </div>
          )
        })}
        </div>
      )}
    </div>
  );
};

export default ComplaintHistory;
