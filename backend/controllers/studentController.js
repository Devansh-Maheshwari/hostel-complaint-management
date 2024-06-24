const express = require("express");
const cors = require("cors");
const app = express();
const Student = require("../models/student");
const asyncWrapper=require('express-async-handler')
app.use(cors());
app.use(express.json());

exports.postStudent = asyncWrapper(async (req, res) => {
  try {
    const { email, hostel_name, usn, room } = req.body;

    const newStudent = new Student({
      email,
      hostel_name,
      usn,
      room,
    });

    const savedStudent = await newStudent.save();
    res.json(savedStudent);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

exports.getStudentByid = asyncWrapper(async (req, res) => {
  try {
    const { email } = req.params;
    const student = await Student.findOne({email:email}); // Assuming student_id is the _id in MongoDB
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server error" });
  }
});
