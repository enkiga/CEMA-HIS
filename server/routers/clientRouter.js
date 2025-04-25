// Import required modules
const express = require("express");
const clientController = require("../controllers/clientController");
const { identifier } = require("../middlewares/identifier"); // Import the identifier middleware

// Setup the router
const router = express.Router();

// Define the routes for client management
router.post("/add-client", identifier, clientController.addClient); // Route for adding a new client

module.exports = router; // Export the router for use in other parts of the application
