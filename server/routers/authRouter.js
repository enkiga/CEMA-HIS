// Import required modules
const express = require("express");
const authController = require("../controllers/authController");
const { identifier } = require("../middlewares/identifier")

// Setup the router
const router = express.Router();

// Define the routes for authentication
router.post("/signup", authController.signup); // Route for user signup
router.post("/signin", authController.signin); // Route for user signin
router.post("/signout", identifier, authController.signout); // Route for user signout
router.get("/doctor", identifier, authController.getDoctor); // Route to get doctor details


module.exports = router; // Export the router for use in other parts of the application