import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", username: "", password: "", phoneNumber: "", email: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/v1/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 5, p: 3, borderRadius: 2, boxShadow: 3, bgcolor: "white" }}>
        <Typography variant="h4" align="center" gutterBottom>Sign Up</Typography>
        <form onSubmit={handleSignup}>
          <TextField fullWidth margin="normal" label="Name" name="name" onChange={handleChange} required />
          <TextField fullWidth margin="normal" label="Username" name="username" onChange={handleChange} required />
          <TextField fullWidth margin="normal" label="Password" type="password" name="password" onChange={handleChange} required />
          <TextField fullWidth margin="normal" label="Phone Number" name="phoneNumber" onChange={handleChange} required />
          <TextField fullWidth margin="normal" label="Email" name="email" onChange={handleChange} required />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>Sign Up</Button>
          {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
        </form>
      </Box>
    </Container>
  );
};

export default Signup;
