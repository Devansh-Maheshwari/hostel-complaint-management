import React, { useState, useEffect } from "react";
import { GetAuthHeader } from "../utils/header";
import clsx from "clsx";
import { json } from "react-router-dom";

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

 const WardenComplaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [filter, setFilter] = useState("");
  const getComplaints = async (e) => {
    try {
      const response = await fetch("https://hostel-complaint-management-2.onrender.com/complaints", {
        method: "GET",
        headers: GetAuthHeader()
      });
      const jsonData = await response.json();

      setComplaints(jsonData);
      console.log(jsonData)
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleApproval = async (id) => {
    
    try {
      const response = await fetch(`https://hostel-complaint-management-2.onrender.com/complaints/${id}`, {
        method: "POST",
        headers: GetAuthHeader(),
      });
     
      console.log(response);
      window.location="/"

    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getComplaints();
  }, []);

  const deleteComplaint = async (id) => {
    console.log(id);
    try {
      const response = await fetch(`https://hostel-complaint-management-2.onrender.com/complaints/${id}`, {
        method: 'DELETE',
        headers: GetAuthHeader(),
      });
      
      console.log(response);
      if (response.ok) {
        getComplaints();
      } else {
        console.error('Failed to delete complaint');
      }
      
    } catch (error) {
      console.error('Error deleting complaint:', error);
    }
  };
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    if (e.target.value === "all") {
      setFilteredComplaints(complaints);
    } else {
      setFilteredComplaints(complaints.filter(complaint => complaint.category === e.target.value));
    }
  };
  return (
    <div className="bg-gray-100 p-4 sm:p-8 md:p-10 h-screen">
  <h1 className="text-2xl font-bold mt-20 mb-8">Complaints</h1>
  <div className="mb-4">
        <label htmlFor="filter" className="mr-2">Filter by category:</label>
        <select id="filter" value={filter} onChange={handleFilterChange}>
        <option value="all">Choose Category</option> 
          <option value="all">All</option>
          <option value="mess">Mess</option>
          <option value="carpenter">Carpenter</option>
          <option value="electrical">Electrical</option>
        </select>
      </div>
  {filteredComplaints.length === 0 ? (
    <p className="ml-4 mt-2 text-gray-600 text-xl">
      No complaints registered yet. 
    </p>
  ) : (
    <div className="container mx-auto grid gap-8 md:grid-cols-3 sm:grid-cols-1">
      {filteredComplaints.map((complaint) => (
        <div key={complaint._id} className="relative flex h-full flex-col rounded-md border border-gray-200 bg-white p-2.5 hover:border-gray-400 sm:rounded-lg sm:p-5">
          <div className="text-lg mb-2 font-semibold text-gray-900 hover:text-black sm:mb-1.5 sm:text-2xl">
            {complaint.name} (Room No. {complaint.room})
          </div>
          <p className="text-sm">Created on {formatTimestamp1(complaint.created_at)}</p>
          
          <p className="text-sm text-gray-400">Category: {complaint.category}</p>
          <div className="flex flex-row ">
          <p className="text-sm text-gray-400 mr-5">Availabiltiy: {complaint.availability}</p>
          <p className="text-sm text-gray-400 mr-5">Timings: {complaint.timing}</p>
          </div>
          <p className="mb-4 text-sm">
            {complaint.assigned_at ? `Completed on ${formatTimestamp(complaint.assigned_at)}` : null}
          </p>
          <div className="text-md leading-normal text-gray-400 sm:block">
            {complaint.description}
          </div>
          <div className="flex">
  <button
    className={clsx(
      "group flex w-1/2 mt-3 cursor-pointer items-center justify-center rounded-md px-4 py-2 text-white transition text-sm",
      complaint.is_completed ? "bg-green-500" : "bg-red-600"
    )}
    
  >
    <span className="group flex w-full items-center justify-center rounded py-1 text-center font-bold">
      {complaint.is_completed ? "Completed" : "Not Completed"}
    </span>
  </button>

  <button
      className="group flex w-1/3 mt-3 ml-3 cursor-pointer items-center justify-center rounded-md px-4 py-2 text-white transition text-sm bg-red-600" onClick={()=>deleteComplaint(complaint._id)}
    >
      <span className="group flex w-full items-center justify-center rounded py-1 text-center font-bold" >
        Delete
      </span>
    </button>
</div>

        </div>
      ))}
    </div>
  )}
</div>
  )
}
export default WardenComplaint