// Import Requirements
require('dotenv').config();
const express = require('express');

// Setting up Express
const app = express();
app.use(express.json());


// Assign port value with fallback to 8000
const PORT = process.env.PORT_URL || 8000;

// Test if server is running
app.get('/', (req, res) => {
    res.send('Server is running!');
});


// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});