const { programCreationSchema } = require("../middlewares/validator");
const Program = require("../models/Program"); // Import the Program model

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
      .populate("clientsEnrolled", "name email") // Populate the clientsEnrolled field with name and email
      .populate("doctorsEnrolled", "name email"); // Populate the doctorsEnrolled field with name and email
    return res.status(200).json({
      success: true,
      programs,
    });
  } catch (error) {
    console.error("Error fetching programs:", error);
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    });
  }
};
