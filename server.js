const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv =require('dotenv');
const jwt = require("jsonwebtoken");
const cors = require("cors");
const {connectdB}=require("./config/db")

dotenv.config();
//DB connection
connectdB();
const app = express();
const PORT = 8080;
const SECRET_KEY = "hactivespace"; // Use environment variables in production.

app.use(cors());
app.use(express.json());


app.use('/api/v1/auth',require('./routes/userRoute'))
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
