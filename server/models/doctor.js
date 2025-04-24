// Import required modules
const mongoose = require("mongoose");


// Define the Doctor schema
const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  }
},{
    timestamps: true,
});

// Create the Doctor model using the schema and export it
module.exports = mongoose.model("Doctor", doctorSchema);