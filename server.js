const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { connectdB } = require("./config/db");

dotenv.config();

// DB connection
connectdB();

const app = express();
const PORT = process.env.PORT || 8080; // Use the port assigned by Render

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth', require('./routes/userRoute'));

// Root Endpoint (Optional: Add a simple test route)
app.get('/', (req, res) => {
  res.send("Server is running!");
});

// Start the Server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
