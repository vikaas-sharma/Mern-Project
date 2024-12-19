import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Register from "../components/Register";
import Login from "../components/Login";
import Dashboard from "../components/Dashboard";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";  // Don't forget to import the CSS

// Define the custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#008394", // Blue color for primary elements
    },
    secondary: {
      main: "#d32f2f", // Red color for secondary elements (used for Logout button)
    },
    background: {
      default: "#f4f6f8", // Lighter background color
    },
  },
  typography: {
    h4: {
      fontWeight: 700,
      fontSize: "2rem", // Adjust heading font size
    },
    body1: {
      fontSize: "1rem", // Adjust body text font size
    },
    button: {
      textTransform: "none", // Remove uppercase styling from buttons
    },
  },
  spacing: 8, // Default spacing (affects margin, padding, etc.)
});

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>

      {/* ToastContainer for global toast notifications */}
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
