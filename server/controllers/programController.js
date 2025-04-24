const Program = require("../models/Program"); // Import the Program model
const Doctor = require("../models/doctor"); // Import the Doctor model

exports.createProgram = async (req, res) => {
  const { name, description } = req.body;

  try {
    // check if name and description are provided
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Name and description are required",
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
