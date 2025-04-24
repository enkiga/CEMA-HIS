// Import required modules
const express = require("express");
const programController = require("../controllers/programController");
const { identifier } = require("../middlewares/identifier"); // Import the identifier middleware

// Setup the router
const router = express.Router();

// Define the routes for authentication
router.post("/create-program", identifier, programController.createProgram) // Route for creating a new program


module.exports = router; // Export the router for use in other parts of the application