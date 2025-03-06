import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import "../styles/Login.css"; // Import CSS file

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "/dashboard";
      } else {
        alert("Login failed: " + data.error);
      }
    } catch (error) {
      alert("Error logging in");
    }
  };

  return (
    <div className="login-page">
      <Container maxWidth="xs">
        <Box className="login-container">
          <Typography variant="h4" className="login-title">Login</Typography>
          <form onSubmit={handleLogin}>
            <TextField fullWidth margin="normal" label="Username" variant="outlined"
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} required />
            <TextField fullWidth margin="normal" label="Password" variant="outlined" type="password"
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} required />
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>Login</Button>
          </form>
          <Box className="login-links">
            <Link to="/signup">Don't have an account? Sign up</Link><br />
            <Link to="/forgot-password">Forgot Password?</Link>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
