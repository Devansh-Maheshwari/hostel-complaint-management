const mongoose=require("mongoose");

const StudentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
    hostel_name: {
      type: String,
      trim: true
    },
    full_name: {
      type: String,
      trim: true
    },
    room: {
      type: String,
      trim: true
    }
  });
  module.exports= mongoose.model('Student', StudentSchema);
