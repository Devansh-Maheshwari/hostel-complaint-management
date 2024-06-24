const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
   hostel_name: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    required: true,
    trim: true
  }
});
module.exports= mongoose.model('User', UserSchema);
