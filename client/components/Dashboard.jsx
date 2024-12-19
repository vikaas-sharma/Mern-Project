import React from "react";
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // If no user is found in localStorage, redirect to login page
  if (!user) {
    navigate("/login");
  }

  // Function to format date to a more readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleLogout = () => {
    // Clear the user and token from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <Box sx={{ padding: 3, position: "relative" }}>
      <Typography variant="h4" sx={{ textAlign: "center", marginBottom: 3, fontWeight: "bold", color: "#1976d2" }}>
        User Dashboard
      </Typography>

      {/* Logout Button Positioned at Top Right */}
      <Box sx={{ position: "absolute", top: 20, right: 20 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleLogout}
          sx={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: 5,
            backgroundColor: "#d32f2f",
            "&:hover": {
              backgroundColor: "#c2185b",
            },
          }}
        >
          Logout
        </Button>
      </Box>

      {/* Card Layout for Table */}
      <Paper sx={{ padding: 2, borderRadius: 3, boxShadow: 3 }}>
        <Table sx={{ minWidth: 650, borderCollapse: "separate", borderSpacing: "0 8px" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "#1976d2" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#1976d2" }}>Date of Birth</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#1976d2" }}>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ backgroundColor: "#f5f5f5", "&:hover": { backgroundColor: "#e3f2fd" } }}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{formatDate(user.dateOfBirth)}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default Dashboard;
