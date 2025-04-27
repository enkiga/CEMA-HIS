// Import required modules
const express = require("express");
const clientController = require("../controllers/clientController");
const { identifier } = require("../middlewares/identifier"); // Import the identifier middleware

// Setup the router
const router = express.Router();

// Define the routes for client management
router.post("/add-client", identifier, clientController.addClient); // Route for adding a new client
router.get("/all-clients", clientController.getClients); // Route for fetching all clients
router.get("/search", clientController.searchClients); // Route for searching clients
router.get("/:id", clientController.getClientById);
router.patch("/:id/enroll", identifier, clientController.enrollClientInProgram); // Route for enrolling a client in a program
router.patch(
  "/:id/unenroll",
  identifier,
  clientController.unenrollClientFromProgram
); // Route for unenrolling a client from a program
router.delete("/:id", identifier, clientController.deleteClient); // Route for deleting a client


module.exports = router; // Export the router for use in other parts of the application
