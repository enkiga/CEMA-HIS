// Import Requirements
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRouter = require("./routers/authRouter");
const programRouter = require("./routers/programRouter");
const clientRouter = require("./routers/clientRouter");

// Setting up Express
const app = express();
app.use(express.json());

// Parsing cookies from the request
app.use(cookieParser());

// Allow Cross-Origin Resource Sharing (CORS) for all origins
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

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
app.use("/api/v1/program", programRouter); // Program routes
app.use("/api/v1/client", clientRouter); // Client routes

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
