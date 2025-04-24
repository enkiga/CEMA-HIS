// Import required modules
const express = require("express");
const authController = require("../controllers/authController");

// Setup the router
const router = express.Router();

// Define the routes for authentication
router.post("/signup", authController.signup); // Route for user signup


module.exports = router; // Export the router for use in other parts of the application