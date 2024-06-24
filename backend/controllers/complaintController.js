const express = require("express");
const cors = require("cors");
const app = express();
const student=require("../models/student");
const warden=require("../models/warden");
const Complaint=require("../models/complaint");
const asyncWrapper=require('express-async-handler')

const jwt = require("jsonwebtoken");
const {jwtGenerator, jwtDecoder} = require("../utils/jwtToken");
const { authorizeStudent }= require('../middleware/auth');
const user = require("../models/user");

app.use(cors());
app.use(express.json());

const decodeUser=async (token)=>{
    try{
        const decodeToken=jwt.verify(token,process.env.JWT_SECRET)
        console.log('token=',decodeToken)
        const {email,type}=decodeToken.user;
        console.log(email,type);
        let userinfo;
        if(type==="student"){
            userinfo=await student.findOne({email:email});
        }
        if(type==="warden"){
            userinfo=await warden.findOne({email:email});
        }
        return userinfo;
    }catch(err){
        console.error(err);
    }
}
exports.postComplaints = asyncWrapper(async (req, res) => {
    try {
      const token = req.headers.authorization;
      console.log("token",token);
      const userInfo = await decodeUser(token);
      console.log("userinfo=",userInfo)
      const { email, type } = userInfo;
      // const studentinfo=await student.findOne({email:email});
      const { name, hostel_name,description, room } = req.body;
      console.log(name,hostel_name,room)
      let newComplaint = {
       name: name,
        hostel_name:hostel_name,
        student_id:userInfo._id,
        description:description,
        room:room
      };
      // console.log(studentinfo)
      const createdComplaint = await Complaint.create(newComplaint);
      console.log(createdComplaint);
      res.json(createdComplaint);
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

exports.putComplaintsByid = asyncWrapper(async (req, res) => {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("token",decodedToken);
    const {  email,type } = decodedToken.user;
  
    try {
      const {id  } = req.params;
  
      if (type === "warden") {
        const userInfo = await decodeUser(token);
        console.log("userinfo=",userInfo)
        const {hostel_name}=userInfo
      
        const result = Complaint.findOneAndUpdate(
          {  _id: id,hostel_name:hostel_name},
          { $set: { is_completed: { $not: "$is_completed" }, assigned_at: new Date() } },
          { returnOriginal: false }
        );
  
        if (!result.value) {
          return res.status(404).json({ error: "Complaint not found" });
        }
  
        res.json(result.value);
      } 
      else if(type==="student"){
        const complaint=await Complaint.findByIdAndUpdate( id,[
          { 
            $set: { 
              is_completed: { $not: "$is_completed" }, 
              assigned_at: {
                $cond: {
                  if: { $eq: ["$is_completed", false] }, // Check if is_completed was false
                  then: new Date(), // Update assigned_at with current date
                  else: "$assigned_at" // Keep assigned_at as is
                }
              } 
            }
          }
        ],
        { new: true });
        console.log("complaints=",complaint)
        if (!complaint) {
          return res.status(404).json({ error: "Complaint not found" });
        }
  
        res.json(complaint)
      }
      else {
        res.status(404).json({ error: "Unauthorized" });
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  exports.getAllComplaintsByUser = asyncWrapper(async (req, res) => {
    const token = req.headers.authorization;
    console.log("token=",token);
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("putComplaintsByid=",decodedToken);
  
    const { email, type } = decodedToken.user;
    console.log(email,type);
    try {
      if (type === "warden") {
        // Fetch the warden's block ID
        const wardenInfo = await warden.findOne({ email: email });
        if (!wardenInfo) {
          return res.status(404).json({ error: "Warden not found" });
        }
  
        // Fetch complaints from the same block
        const allComplaints = await Complaint.find({ hostel_name: wardenInfo.hostel_name,is_deleted:false }).sort({ created_at: -1 });
        res.json(allComplaints);
      } else if (type === "student") {
        const studentinfo=await student.findOne({email:email});
        console.log(studentinfo)
        const myComplaints = await Complaint.find({student_id:studentinfo._id,is_completed:false }).sort({ created_at: -1 });
        res.json(myComplaints);
      } else {
        res.status(403).json({ error: "Unauthorized" });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  exports.getUserType = asyncWrapper(async(req, res)=> {
    try{
    const token = req.headers.authorization;
    console.log(token);
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken)
    const { type } = decodedToken.user;
  
    res.json({ userType: type });
    }  
   catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
  })
  
  exports.getUserDetails = async (req, res) => {
    try {
      const token = req.headers.authorization;
      console.log(token);
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decodedToken);
      const {  email,type } = decodedToken.user;
     
  //check these
        const userInfo=await user.findOne({email:email});
        console.log(userInfo)
      
      if (type === 'student') {
        const studentDetails = await student.findOne({ email:email })
        res.json({studentDetails ,phone:userInfo.phone,full_name:userInfo.full_name ,type:type });
      }
      if (type === 'warden') {
        const wardenDetails = await user.findOne({email:email});
        res.json({wardenDetails,phone:userInfo.phone,full_name:userInfo.full_name,type:type});
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
exports.deleteComplaints = async (req, res) => {
    try {
      const token = req.headers.authorization;
      console.log(token);
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decodedToken);
      const { type } = decodedToken.user;
      const { id } = req.params;
  
      if (type === 'warden') {
        const complaint = await Complaint.findById(id);
        if (!complaint) {
          return res.status(404).json({ error: 'Complaint not found' });
        }
  
        // Update is_deleted based on is_completed status
        const updateData = { $set: { is_deleted: complaint.is_completed } };
        console.log(updateData);
        const result = await Complaint.findByIdAndUpdate(id, updateData, { new: true });
        
        res.json({ message: 'Complaint deleted' });
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };