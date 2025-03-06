import React, { useState } from "react";
import { Container, TextField, Button, Typography, Alert, Box, Card, CardContent } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";

const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // Step 1: Verify username
  const handleVerifyUsername = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await fetch("http://localhost:3000/v1/verify-username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const result = await response.json();

      if (response.ok) {
        setShowUpdatePassword(true);
        setMessage("Username verified. You can now update your password.");
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  // Step 2: Update password
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/v1/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, newPassword }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Password updated successfully! Redirecting to login...");
        setTimeout(() => (window.location.href = "/"), 3000);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm" className="mt-5">
      <Card className="shadow-lg p-3 mb-5 bg-white rounded">
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            {showUpdatePassword ? "Update Password" : "Forgot Password"}
          </Typography>

          {!showUpdatePassword ? (
            <form onSubmit={handleVerifyUsername}>
              <TextField
                fullWidth
                label="Enter your Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mb-3"
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit
              </Button>
            </form>
          ) : (
            <form onSubmit={handleUpdatePassword}>
              <TextField
                fullWidth
                label="New Password"
                variant="outlined"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="mb-3"
              />
              <TextField
                fullWidth
                label="Confirm New Password"
                variant="outlined"
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
                className="mb-3"
              />
              <Button type="submit" variant="contained" color="success" fullWidth>
                Update Password
              </Button>
            </form>
          )}

          {error && (
            <Box mt={2}>
              <Alert severity="error">{error}</Alert>
            </Box>
          )}

          {message && (
            <Box mt={2}>
              <Alert severity="success">{message}</Alert>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default ForgotPassword;
