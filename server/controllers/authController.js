// Import required modules
const jwt = require("jsonwebtoken"); // Import JWT for token generation
const Doctor = require("../models/doctor"); // Import the Doctor modelconst { StatusCodes } = require("http-status-codes"); // Import status codes for HTTP responses
const { doHash,doHashValidation } = require("../utils/hashing"); // Import hashing utility functions
const { registrationSchema, loginSchema } = require("../middlewares/validator"); // Import validation schema
const doctor = require("../models/doctor");

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

// Handle signin process for doctors
exports.signin = async (req, res) => {
  const { email, password } = req.body;

  // try catch block to handle errors
  try {
    const { error, value } = loginSchema.validate({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({
        status: false,
        message: error.details[0].message,
      });
    }

    // Check if the doctor exists in the database
    const existingDoctor = await Doctor.findOne({ email }).select("+password"); // Select the password field to compare it later

    if (!existingDoctor) {
      return res.status(401).json({
        success: false,
        message: "Doctor not found. Please register first.",
      });
    }

    // Validate the password
    const isPasswordValid = await doHashValidation(
      password,
      existingDoctor.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate a JWT token for the doctor
    const token = jwt.sign(
      {
        doctorId: existingDoctor._id,
        email: existingDoctor.email,
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "8h",
      }
    );

    // response to the client
    res
      .cookie("Authorization", `Bearer ${token}`, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Set secure flag in production
        sameSite: "strict", // Set SameSite attribute to prevent CSRF attacks
        maxAge: 8 * 60 * 60 * 1000, // Set cookie expiration time to 8 hours
        path: "/", // Set the path for the cookie
      })
      .json({
        success: true,
        message: "Doctor signed in successfully",
        doctor: {
          id: existingDoctor._id,
          name: existingDoctor.name,
          email: existingDoctor.email,
          password: undefined, // Do not send the password in the response
        },
        token: token, // Send the token in the response
      });
  } catch (error) {
    console.error("Error during signin:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Handle signout process for doctors
exports.signout = async (req, res) => {
  res
    .clearCookie("Authorization") // Clear the cookie to sign out the doctor
    .status(200) // Send a 200 OK status code
    .json({
      success: true,
      message: "Doctor signed out successfully",
    }); // Send a success message to the client
};
