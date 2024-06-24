const express = require("express");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt");
const Student=require("../models/student");
const Warden=require("../models/warden");
const User=require("../models/user");
const asyncWrapper=require('express-async-handler')
const {jwtGenerator, jwtDecoder} = require("../utils/jwtToken");

const jwt = require("jsonwebtoken");
app.use(cors());
app.use(express.json());

exports.userRegister = asyncWrapper(async (req, res) => {
    const { full_name, email, phone, password, type, block_id, room } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(401).json("User already exist!");
      }
  
      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(password, salt);
  
      const newUser = new User({
        full_name,
        email,
        phone,
        password: bcryptPassword,
        hostel_name:block_id,
        type,
      });
  
      await newUser.save();
  
      const jwtToken = jwtGenerator(newUser.email, newUser.type);
  
      if (type === "student") {
        const newStudent = new Student({
          email: newUser.email,
          hostel_name:block_id,
          full_name,
          room,
        });
        await newStudent.save();
      } else if (type === "warden") {
        const newWarden = new Warden({
          email: newUser.email,
          hostel_name:block_id,
        });
        await newWarden.save();
      } else if (type === "worker") {
        const newWorker = new Worker({
          worker_id: newUser._id,
          category_id: null, // Assuming this is optional and can be set later
        });
        await newWorker.save();
      }
  
      return res.json({ jwtToken });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

  exports.userLogin = asyncWrapper(async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email :email});
      if (!user) {
        return res.status(401).json("Invalid Credential");
      }
  
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json("Invalid Credential");
      }
  
      const jwtToken = jwtGenerator(user.email, user.type);
      console.log(jwt.verify(jwtToken, process.env.JWT_SECRET)); // Assuming `jwtDecoder` is `jwt.verify`
  
      return res.json({ jwtToken });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
