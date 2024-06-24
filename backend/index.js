const express=require("express");
const cors = require("cors");
const app=express();

require('dotenv').config();
const PORT=process.env.PORT ||4000;

app.use(cors());
app.use(express.json());

require("./config/database").connect();

const complaintRoutes = require("./routes/complaintRoute");
const studentRoutes = require("./routes/studentRoute");
const wardenRoutes = require("./routes/wardenRoute");
const userRoutes = require("./routes/userRoute");
const { authorizeWarden, authorizeStudent } = require("./middleware/auth");


app.use('/', complaintRoutes);
app.use('/', studentRoutes)
app.use('/', wardenRoutes)

app.use('/', userRoutes)

app.use('/student', authorizeStudent, studentRoutes); 
app.use('/warden', authorizeWarden, wardenRoutes); 

app.listen(PORT ,()=>{
    console.log(`app running at port ${PORT}`);
})
