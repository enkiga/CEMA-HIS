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

// Get single client by ID
exports.getClientById = async (req, res) => {
  const { id } = req.params; // Get the client ID from the request parameters

  try {
    // Fetch the client by ID and populate the creator field with name and email and the programEnrolled field with name and description
    const client = await Client.findById(id)
      .populate("creator", "name email") // Populate the creator field with name and email
      .populate("programEnrolled", "name description"); // Populate the programEnrolled field with name and description

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Client fetched successfully",
      data: client,
    });
  } catch (error) {
    console.error("Error fetching client:", error); // Log the error for debugging
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    });
  }
};

// Get doctor who created the client enroll the clent in a program
exports.enrollClientInProgram = async (req, res) => {
  // get client id from parameters
  const { id } = req.params; // Get the client ID from the request parameters
  const { programId } = req.body; // Get the program ID from the request body

  try {
    // check if the client exists
    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    // check if the program ID is valid
    if (!programId) {
      return res.status(400).json({
        success: false,
        message: "Program ID is required",
      });
    }

    // check if the client is already enrolled in the program
    if (client.programEnrolled.includes(programId)) {
      return res.status(400).json({
        success: false,
        message: "Client is already enrolled in this program",
      });
    }

    // enroll the client in the program
    // Add the program ID to the client's enrolled programs together with the program name and description
    client.programEnrolled.push(programId); // Add the program ID to the client's enrolled programs
    await client.save(); // Save the updated client to the database

    return res.status(200).json({
      success: true,
      message: "Client enrolled in program successfully",
      data: client,
    });
  } catch (error) {
    console.error("Error enrolling client in program:", error); // Log the error for debugging
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    });
  }
};
