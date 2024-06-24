const express = require("express");
const cors = require("cors");
const app = express();
const Warden = require("../models/warden");
const asyncWrapper=require('express-async-handler')
app.use(cors());
app.use(express.json());

exports.postWarden = asyncWrapper(async (req, res) => {
  try {
    const { email,hostel_name } = req.body;

    const newWarden = new Warden({
      email,
      hostel_name,
      
    });

    const savedWarden = await newWarden.save();
    res.json(savedWarden);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

exports.getWardenByid = asyncWrapper(async (req, res) => {
  try {
    const { email } = req.params;
    const warden = await Warden.findOne({email:email}); // Assuming student_id is the _id in MongoDB
    if (!warden) {
      return res.status(404).json({ message: "Warden not found" });
    }
    res.json(warden);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server error" });
  }
});
