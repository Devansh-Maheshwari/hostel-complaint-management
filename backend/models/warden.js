const mongoose=require("mongoose");

const WardenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
    hostel_name: {
      type: String,
      required: true,
      trim: true
    }
    
  });
  module.exports= mongoose.model('Warden', WardenSchema);
  
