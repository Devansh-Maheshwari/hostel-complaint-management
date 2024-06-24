const express = require('express');
const studentRoutes = express.Router()

const { postStudent, getStudentByid } = require('../controllers/studentController');

studentRoutes.route("/student").post(postStudent);

studentRoutes.route("/student/:email").get(getStudentByid);

module.exports = studentRoutes