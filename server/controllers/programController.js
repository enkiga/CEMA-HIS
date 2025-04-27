const { programCreationSchema } = require("../middlewares/validator");
const Program = require("../models/Program"); // Import the Program model
const Client = require("../models/client"); // Import the Client model

exports.createProgram = async (req, res) => {
  const { name, description } = req.body;

  try {
    const { error, value } = programCreationSchema.validate({
      name,
      description,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    // check if the program already exists
    const existingProgram = await Program.findOne({ name });
    if (existingProgram) {
      return res.status(400).json({
        success: false,
        message: "Program with this name already exists",
      });
    }

    // Create a new program instance
    const newProgram = new Program({
      creator: req.user.doctorId, // Assuming req.Doctor contains the authenticated doctor's information
      name,
      description,
    });

    await newProgram.save();

    return res.status(201).json({
      success: true,
      message: "Program created successfully",
      program: newProgram,
    });
  } catch (error) {
    console.error("Error creating program:", error); // Log the error for debugging
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    });
  }
};

exports.getPrograms = async (req, res) => {
  try {
    // Fetch all programs from the database
    // Populate the creator field with doctor details also for the clientsEnrolled and doctorsEnrolled fields
    const programs = await Program.find()
      .populate("creator", "name email") // Populate the creator field with name and email
      .populate("clientsEnrolled", "name email");

    return res.status(200).json({
      success: true,
      message: "Programs fetched successfully",
      data: programs,
    });
  } catch (error) {
    console.error("Error fetching programs:", error);
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    });
  }
};

// Delete a program by ID and also clear client enrollment field in client model
exports.deleteProgram = async (req, res) => {
  const { id } = req.params; // Extract programId from request parameters

  try {
    // Find the program by ID and delete it
    const deletedProgram = await Program.findByIdAndDelete(id);

    if (!deletedProgram) {
      return res.status(404).json({
        success: false,
        message: "Program not found",
      });
    }

    // Remove the program from all clients enrolled in it
    await Client.updateMany(
      { programEnrolled: id },
      { $pull: { programEnrolled: id } }
    );

    return res.status(200).json({
      success: true,
      message: "Program deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting program:", error);
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    });
  }
};
