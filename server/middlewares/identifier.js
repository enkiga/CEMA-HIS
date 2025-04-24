// import requirements
const jwt = require("jsonwebtoken");

exports.identifier = async (req, res, next) => {
  // try-catch block to handle errors
  try {
    let token;

    // Handle both browser and non browser clients safely
    if (req.headers?.client === "not-browser") {
      // Handlle API client with Auth header
      token = req.headers?.authorization;
    } else {
      // Handle browser clients with cookies
      token = req.cookies?.Authorization;
    }

    // Validate token existence
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    // Extract the token from the header or cookie
    const [bearer, jwtToken] = token.split(" ");

    if (bearer !== "Bearer" || !jwtToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid token format",
      });
    }

    // verify the token
    const decoded = jwt.verify(jwtToken, process.env.TOKEN_SECRET);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    req.user = decoded; // Attach the decoded token to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error in identifier middleware:", error); // Log the error for debugging

    // Clean up the token if it is invalid
    if (req.headers?.client === "not-browser") {
      delete req.headers.authorization;
    } else {
      delete req.cookies.Authorization;
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
