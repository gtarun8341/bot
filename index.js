const express = require('express');
const app = express();
const webhook = require('./api/webhook');

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle webhook endpoint
app.use('/api/webhook', webhook);

// Define the port where the server will listen
const PORT = process.env.PORT || 3000;

// Start the server and log a message once it's running
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
