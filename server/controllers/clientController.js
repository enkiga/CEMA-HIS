const { clientCreationSchema } = require("../middlewares/validator");
const Client = require("../models/client"); // Import the Client model

exports.addClient = async (req, res) => {
  const { name, email } = req.body; // Destructure the request body to get client details

  try {
    // Validate the request body using the client creation schema
    const { error, value } = clientCreationSchema.validate({
      name,
      email,
    });

    if (error) {
      return res.status(401).json({
        status: false,
        message: error.details[0].message,
      });
    }

    // Check if the client already exists in the database
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(401).json({
        success: false,
        message: "Client already exists",
      });
    }

    // Create a new client instance
    const newClient = new Client({
      creator: req.user.doctorId, // Set the creator to the authenticated user's ID
      name,
      email,
    });

    // Save the new client to the database
    const result = await newClient.save();

    return res.status(201).json({
      success: true,
      message: "Client added successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error adding client:", error); // Log the error for debugging
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    });
  }
};

exports.getClients = async (req, res) => {
  try {
    // Fetch all clients from the database
    const clients = await Client.find()
      .populate("creator", "name email") // Populate the creator field with name and email
      .populate("programEnrolled", "name description"); // Populate the programsEnrolled field with name and description

    return res.status(200).json({
      success: true,
      message: "Clients fetched successfully",
      data: clients,
    });
  } catch (error) {
    console.error("Error fetching clients:", error); // Log the error for debugging
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    });
  }
};
