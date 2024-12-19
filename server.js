const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectdB } = require("./config/db");
const path = require("path");

// Load environment variables
dotenv.config();

// Connect to the database
connectdB();

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth', require('./routes/userRoute'));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, './client/dist')));

// Fallback route for serving `index.html` for all other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/dist/index.html'));
});

// Start the server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
