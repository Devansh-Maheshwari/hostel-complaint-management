import React, { useState,useEffect } from "react";
import { GetAuthHeader } from "../utils/header";

const ComplaintForm = ({ onFormSubmit }) => {
  const [name, setName] = useState("");
  const [hostel_name, setHostel_name] = useState("");
  const [category, setCategory] = useState("");
  const [availability, setAvailability] = useState("");
  const[timings,setTimings]=useState("");
  const [description, setDescription] = useState("");
  const [room, setRoom] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmitForm = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter a valid name.");
      return;
    }
    if (!room.trim()) {
      alert("Please enter Room No.");
      return;
    }
    if (!description.trim()) {
      alert("Please enter a valid complaint.");
      return;
    }

    try {
      const headers = GetAuthHeader();
      console.log(headers);
      let body = { name, hostel_name, description, room,category,availability,timings };
      console.log(body);    

      const response = await fetch("https://hostel-complaint-management-2.onrender.com/complaints", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      if (response.ok) {
        // window.location = "/";
        console.log(response);
        setIsSubmitted(true);
        // Reset form fields if needed
        setName("");
        setHostel_name("");
        setDescription("");
        setRoom("");
        setAvailability("")
        setCategory("")
        setTimings("")
        onFormSubmit();
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    console.log(isSubmitted);
    if (isSubmitted) {
      // Reset isSubmitted to false after 3 seconds
      const timer = setTimeout(() => setIsSubmitted(false), 3000);
      // Clean up the timer if the component unmounts
      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);

  return (
   <div className="bg-gray-100 h-full w-full mx-auto flex items-center justify-center  flex-col rounded-lg lg:max-w-screen-xl lg:flex-row">
    <div className="border border-gray-100 shadow-gray-500/20 mt-8 mb-8 max-w-md bg-white shadow-sm sm:rounded-lg sm:shadow-lg lg:mt-0">
    <form onSubmit={onSubmitForm} className="p-4 sm:p-8">
      <label htmlFor="name">Complaint Name:</label>
      <input
        id="name"
        type="text"
        value={name}
        className="mt-1 w-full resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none hover:border-blue-500"
        placeholder="Enter Complaint name"
        onChange={(e) => setName(e.target.value)}
        />
      <label htmlFor="hostelname">Hostel Name:</label>
      <select
        id="hostelname"
        name="hostelname"
        className="peer mt-1 w-full resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none hover:border-blue-500"
        onChange={(e) => setHostel_name(e.target.value)}
        value={hostel_name}
         >
        <option value="" disabled>Select your block</option>
        <option value="bh1">BH1</option>
        <option value="bh2">BH2</option>
        <option value="bh3">BH3</option>
    </select>
      <label htmlFor="room">Room No.:</label>
      <input
        id="room"
        type="text"
        value={room}
        className="peer mt-1 w-full resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none hover:border-blue-500"
        placeholder="Enter your Room No."
        onChange={(e) => setRoom(e.target.value)}
        />
        <label htmlFor="category">Category</label>
      <select
        id="category"
        name="category"
        className="peer mt-1 w-full resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none hover:border-blue-500"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
         >
        <option value="" disabled>Select your category</option>
        <option value="mess">mess</option>
        <option value="elcetrical">elcetrical</option>
        <option value="carpenter">carpenter</option>
    </select>
    <div className="flex flex-row ">
    <div>
    <label for="availibility">Available</label>
    <input type="date" 
           id="availibility" 
           className="peer mt-1 w-5/6 resize-y overflow-auto rounded-lg border border-gray-300 px-3 py-1 shadow-sm focus:border-blue-500 focus:outline-none hover:border-blue-500"
           name="availibility"
           onChange={(e) => setAvailability(e.target.value)} 
           value={availability}/>
    </div>
    <div>
       <label htmlFor="timings">Timing</label>
       <select
        id="timings"
        name="timings"
        className="peer mt-1 w-full resize-y overflow-auto rounded-lg border border-gray-300 px-3 py-1.5 shadow-sm focus:border-blue-500 focus:outline-none hover:border-blue-500"
        onChange={(e) => setTimings(e.target.value)}
        value={timings}
        >
        <option value="" disabled>Timings</option>
        <option value="10AM-12PM">10AM-12PM</option>
        <option value="4PM-6PM">4PM-6PM</option>
        <option value="4PM-6PM">4PM-6PM</option>
        <option value="4PM-6PM">4PM-6PM</option>
    </select>
   </div>
    </div>
      <label htmlFor="description">Tell us about your grievance:</label>
      <textarea
        id="description"
        value={description}
        className="mb-8 w-full resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none hover:border-blue-500"
        onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      <button
        type="submit"
        className="w-full rounded-lg border border-blue-700 bg-blue-700 p-3 text-center font-medium text-white outline-none transition focus:ring hover:border-blue-700 hover:bg-blue-600 hover:text-white"
        >
        Submit
      </button>
    </form>
    </div>
    </div> 
  );
};

export default ComplaintForm;
