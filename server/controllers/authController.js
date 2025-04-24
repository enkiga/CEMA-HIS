// Used to handle authentication and authorization processes for the doctors
// This module will include functions for login, registration, and token management

// Import required modules
const Doctor = require("../models/doctor"); // Import the Doctor modelconst { StatusCodes } = require("http-status-codes"); // Import status codes for HTTP responses
const { doHash } = require("../utils/hashing"); // Import hashing utility functions
const { registrationSchema } = require("../middlewares/validator"); // Import validation schema
// Handle signup process for doctors
exports.signup = async (req, res) => {
  const { name, email, password } = req.body; // Destructure the request body to get name, email, and password

  // try catch block to handle errors
  try {
    const { error, value } = registrationSchema.validate({
      name,
      email,
      password,
    });

    if (error) {
      return res.status(401).json({
        status: false,
        message: error.details[0].message,
      });
    }

    // Check if the doctor already exists in the database
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res
        .status(401)
        .json({ success: false, message: "Doctor already exists" });
    }

    // Password handling
    const hashedPassword = await doHash(password, 12);

    // Create a new doctor instance
    const newDoctor = new Doctor({
      name,
      email,
      password: hashedPassword,
    });

    // Save the new doctor to the database
    const result = await newDoctor.save();
    // Do not send the password in the response
    result.password = undefined; // Set password to undefined to avoid sending it in the response

    res.status(201).json({
      success: true,
      message: "Doctor registered successfully",
      doctor: result,
    });
  } catch (error) {
    console.error("Error during signup:", error); // Log the error for debugging
    res
      .status(500) // Send a 500 Internal Server Error status code
      .json({ success: false, message: "Internal server error" }); // Send a generic error message to the client
  }
};
