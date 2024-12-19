import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/api/v1/auth/register", { name, dateOfBirth, email, password });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/dashboard");
        } catch (err) {
            console.error("Registration failed:", err);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "#f7f7f7", // lighter background for the page
            }}
        >
            <Box
                component="form"
                onSubmit={handleRegister}
                sx={{
                    width: "100%",
                    maxWidth: 450,
                    padding: 4,
                    borderRadius: 3,
                    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff",
                    textAlign: "center", // Centers the text inside the form
                }}
            >
                <Typography variant="h4" sx={{ textTransform: "uppercase", mb: 3 }}>
                    Register
                </Typography>

                <TextField
                    fullWidth
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    margin="normal"
                    required
                    variant="outlined"
                    sx={{ mb: 2 }} // Adds margin bottom for spacing
                />
                <TextField
                    fullWidth
                    type="date"
                    label="Date of Birth"
                    InputLabelProps={{ shrink: true }}
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    margin="normal"
                    required
                    variant="outlined"
                    sx={{ mb: 2 }} // Adds margin bottom for spacing
                />
                <TextField
                    fullWidth
                    type="email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                    required
                    variant="outlined"
                    sx={{ mb: 2 }} // Adds margin bottom for spacing
                />
                <TextField
                    fullWidth
                    type="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    required
                    variant="outlined"
                    sx={{ mb: 2 }} // Adds margin bottom for spacing
                />

<Button
  type="submit"
  variant="contained"
  sx={{
    mt: 2,
    py: 1, // Reduced padding for a smaller button
    fontSize: "0.875rem", // Smaller font size
    borderRadius: 2, // Rounded corners
    width: "auto", // Ensures the button is not stretched
    paddingLeft: 3, // Optional: Adds a little padding to the left and right
    paddingRight: 3, // Optional: Adds padding to the right
  }}
>
  Register
</Button>

<Button
  onClick={() => navigate("/login")}
  sx={{
    mt: 2, // Adjust margin-top to move it just below the Register button
    fontSize: "0.9rem",
    color: "#1976d2",
    borderRadius: 2,
    "&:hover": {
      backgroundColor: "#e3f2fd",
    },
    width: "100%", // Ensures the button is full width within the form
  }}
>
  Already have an account? Log in
</Button>

            </Box>
        </Box>
    );
}

export default Register;
