import React, { useState } from "react";
import { TextField, Button, Box, Typography, FormControlLabel, Checkbox } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast

// Make sure to include ToastContainer at the root of your app
import "react-toastify/dist/ReactToastify.css"; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/v1/auth/login", { email, password });
      
      // Store token and user in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (rememberMe) {
        localStorage.setItem("rememberMe", true);
      }

      // Notify success and navigate to dashboard
      toast.success("Login successful!");
      console.log("Login successful, navigating to dashboard...");
      navigate("/dashboard");

    } catch (err) {
      if (err.response) {
        // Handle known errors from backend response
        if (err.response.status === 401) {
          toast.error("Invalid credentials. Password is incorrect.");
        }else if (err.response.status === 404) {
          toast.error("Email not found. Please register.");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      } else {
        // Handle network or other errors
        toast.error("Network error. Please try again later.");
      }
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <Box
        maxWidth={450}
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        justifyContent={"center"}
        margin="auto"
        marginTop={5}
        boxShadow="10px 10px 20px #ccc"
        padding={3}
        borderRadius={5}
      >
        <Typography variant="h4" sx={{ textTransform: "uppercase" }} padding={3} textAlign="center">
          Login
        </Typography>

        <TextField
          placeholder="Email"
          value={email}
          name="email"
          margin="normal"
          type={"email"}
          required
          fullWidth
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          placeholder="Password"
          value={password}
          name="password"
          margin="normal"
          type={"password"}
          required
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Remember Me checkbox */}
        <FormControlLabel
          control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
          label="Remember me"
        />
<Button
  type="submit"
  sx={{
    mt: 2, // Margin-top for spacing
    py: 1, // Reduced padding for a smaller button
    fontSize: "0.875rem", // Smaller font size
    borderRadius: 2, // Rounded corners
    width: "auto", // Ensures the button is not stretched
    paddingLeft: 3, // Optional: Adds a little padding to the left and right
    paddingRight: 3, // Optional: Adds padding to the right
  }}
  variant="contained"
  color="primary"
>
  Submit
</Button>

        <Button
          onClick={() => navigate("/register")}
          sx={{ borderRadius: 3, marginTop: 3 }}
          fullWidth
        >
          Not a user? Please Register
        </Button>
      </Box>
    </form>
  );
}

export default Login;
