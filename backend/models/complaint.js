const mongoose=require("mongoose");

const ComplaintSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  hostel_name: {
    type: String,
    trim: true
  },
  student_id: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  room: {
    type: String,
    trim: true
  },
  is_completed: {
    type: Boolean,
    default: false
  },
  is_deleted: {
    type: Boolean,
    default: false
  },

  created_at: {
    type: Date,
    default: Date.now
  },
  assigned_at: {
    type: Date
  }
});
module.exports = mongoose.model('Complaint', ComplaintSchema);


