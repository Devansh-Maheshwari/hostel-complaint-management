const express = require("express");
const complaintRoutes = express.Router();
const { postComplaints,putComplaintsByid, getAllComplaintsByUser, getUserType, getUserDetails, deleteComplaints } = require("../controllers/complaintController");
// Post a new complaint
complaintRoutes.post("/complaints", postComplaints);

// Get all complaints by user
complaintRoutes.get("/complaints", getAllComplaintsByUser);

// Update a complaint by ID
complaintRoutes.post("/complaints/:id", putComplaintsByid);

// Get user type
complaintRoutes.get("/userType", getUserType);

// Get user details by ID
complaintRoutes.get("/userDetails/:id", getUserDetails);

// Delete a complaint by ID
complaintRoutes.delete("/complaints/:id", deleteComplaints);

module.exports = complaintRoutes;

