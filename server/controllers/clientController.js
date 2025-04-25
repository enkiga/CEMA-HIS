const { clientCreationSchema } = require("../middlewares/validator");
const Client = require("../models/client"); // Import the Client model
const Program = require("../models/Program"); // Import the Program model
const mongoose = require("mongoose"); // Import mongoose for ObjectId validation

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
  const { id: clientId } = req.params;
  const { programId } = req.body;

  try {
    // Validate programId
    if (!mongoose.Types.ObjectId.isValid(programId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Program ID format",
      });
    }

    // Check if both client and program exist
    const [client, program] = await Promise.all([
      Client.findById(clientId),
      Program.findById(programId),
    ]);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    if (!program) {
      return res.status(404).json({
        success: false,
        message: "Program not found",
      });
    }

    // Check existing enrollment in both directions
    if (client.programEnrolled.includes(programId)) {
      return res.status(400).json({
        success: false,
        message: "Client already enrolled in this program",
      });
    }

    if (program.clientsEnrolled.includes(clientId)) {
      return res.status(400).json({
        success: false,
        message: "Client already exists in program enrollment list",
      });
    }

    // Update both documents in a transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Add program to client
      await Client.findByIdAndUpdate(
        clientId,
        { $addToSet: { programEnrolled: programId } },
        { session }
      );

      // Add client to program
      await Program.findByIdAndUpdate(
        programId,
        { $addToSet: { clientsEnrolled: clientId } },
        { session }
      );

      await session.commitTransaction();
      session.endSession();

      // Get updated data with population
      const updatedClient = await Client.findById(clientId).populate(
        "programEnrolled",
        "name description"
      );

      return res.status(200).json({
        success: true,
        message: "Enrollment successful",
        data: updatedClient,
      });
    } catch (transactionError) {
      await session.abortTransaction();
      session.endSession();
      throw transactionError;
    }
  } catch (error) {
    console.error("Enrollment error:", error);
    return res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
};

// Unenroll client from a program
exports.unenrollClientFromProgram = async (req, res) => {
  const { id: clientId } = req.params;
  const { programId } = req.body;

  try {
    // Validate programId
    if (!mongoose.Types.ObjectId.isValid(programId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Program ID format",
      });
    }

    // Check if both client and program exist
    const [client, program] = await Promise.all([
      Client.findById(clientId),
      Program.findById(programId),
    ]);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    if (!program) {
      return res.status(404).json({
        success: false,
        message: "Program not found",
      });
    }

    // Check existing enrollment in both directions
    if (!client.programEnrolled.includes(programId)) {
      return res.status(400).json({
        success: false,
        message: "Client not enrolled in this program",
      });
    }

    if (!program.clientsEnrolled.includes(clientId)) {
      return res.status(400).json({
        success: false,
        message: "Client does not exist in program enrollment list",
      });
    }

    // Update both documents in a transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Remove program from client
      await Client.findByIdAndUpdate(
        clientId,
        { $pull: { programEnrolled: programId } },
        { session }
      );

      // Remove client from program
      await Program.findByIdAndUpdate(
        programId,
        { $pull: { clientsEnrolled: clientId } },
        { session }
      );

      await session.commitTransaction();
      session.endSession();

      // Get updated data with population
      const updatedClient = await Client.findById(clientId).populate(
        "programEnrolled",
        "name description"
      );

      return res.status(200).json({
        success: true,
        message: "Unenrollment successful",
        data: updatedClient,
      });
    } catch (transactionError) {
      await session.abortTransaction();
      session.endSession();
      throw transactionError;
    }
  } catch (error) {
    console.error("Unenrollment error:", error);
    return res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
};

// Delete a client by ID and also clear program enrollment field in program model
exports.deleteClient = async (req, res) => {
  const { id } = req.params; // Extract clientId from request parameters

  try {
    // Find the client by ID and delete it
    const deletedClient = await Client.findByIdAndDelete(id);

    if (!deletedClient) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    // Remove the client from all programs enrolled in it
    await Program.updateMany(
      { clientsEnrolled: id },
      { $pull: { clientsEnrolled: id } }
    );

    return res.status(200).json({
      success: true,
      message: "Client deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting client:", error);
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    });
  }
};
