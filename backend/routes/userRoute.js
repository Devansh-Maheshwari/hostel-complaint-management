const express = require("express");
const userRoutes = express.Router();

const { userRegister, userLogin } = require('../controllers/userController')
const { authorizeWarden, authorizeStudent, authorizeWorker, authorizeComplaintRoute } = require('../middleware/auth')

userRoutes.post("/register",userRegister);
userRoutes.post("/login",userLogin);


userRoutes.get("/warden",authorizeWarden,(req, res) => {
    res.json({ message: "This route is accessible by wardens only." });
  });  
  userRoutes.get("/student",authorizeStudent,(req, res) => {
    res.json({ message: "This route is accessible by students only." });
  });  
  userRoutes.get("/complaints",authorizeComplaintRoute,(req, res) => {
    res.json({ message: "This route is accessible by conplaints." });
  });  

module.exports = userRoutes 