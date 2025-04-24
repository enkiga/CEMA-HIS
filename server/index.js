// Import Requirements
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const authRouter = require("./routers/authRouter");

// Setting up Express
const app = express();
app.use(express.json());

// Assign port value with fallback to 8000
const PORT = process.env.PORT_URL || 8000;

// Connect to MongoDB using Mongoose
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error(`MongoDB connection error: ${err}`));

// Test if server is running
// app.get("/", (req, res) => {
//   res.send("Server is running!");
// });

// Set up routes
app.use("/api/v1/auth", authRouter); // Authentication routes

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
