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

// MongoDB connection
// mongoose.connect("mongodb+srv://vikaasoct15:DnzblQOFf6xEOI3D@cluster0.bk1gkx9.mongodb.net/userDb")
//     .then(() => console.log("MongoDB connected"))
//     .catch(err => console.error("MongoDB connection error:", err));

// // Schema and Model
// const userSchema = new mongoose.Schema({
//     name: String,
//     dateOfBirth: Date,
//     email: { type: String, unique: true },
//     password: String
// });
// const User = mongoose.model("User", userSchema);

// Registration API
// app.post("/register", async (req, res) => {
//     const { name, dateOfBirth, email, password } = req.body;
//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({ name, dateOfBirth, email, password: hashedPassword });
//         await newUser.save();
//         const token = jwt.sign({ email }, SECRET_KEY);
//         res.status(201).json({ token, user: { name, dateOfBirth, email } });
//     } catch (error) {
//         res.status(500).json({ error: "Registration failed" });
//     }
// });

// Login API
// app.post("/login", async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await User.findOne({ email });
//         if (user && await bcrypt.compare(password, user.password)) {
//             const token = jwt.sign({ email }, SECRET_KEY);
//             res.json({ token, user: { name: user.name, dateOfBirth: user.dateOfBirth, email: user.email } });
//         } else {
//             res.status(401).json({ error: "Invalid credentials" });
//         }
//     } catch (error) {
//         res.status(500).json({ error: "Login failed" });
//     }
// });
app.use('/api/v1/auth',require('./routes/userRoute'))
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
