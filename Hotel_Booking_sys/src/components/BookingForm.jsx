import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";  
import {
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Select,
  MenuItem,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

const BookingForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // Initialize navigation

  const [formData, setFormData] = useState({
    user_id: "",
    hotel_name: "",
    check_in: "",
    check_out: "",
    guest: "",
    room_type: "Single",
    payment: "",
  });

  const [message, setMessage] = useState({ open: false, text: "", severity: "success" });

  // Auto-Fill user_id & hotel_name
  useEffect(() => {
    const fetchUserId = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://localhost:3000/api/user-id", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (data.user_id) {
          setFormData((prev) => ({ ...prev, user_id: data.user_id }));
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    // Get `hotel_name` from URL query parameter
    const hotelNameFromURL = searchParams.get("hotel_name");
    if (hotelNameFromURL) {
      setFormData((prev) => ({ ...prev, hotel_name: decodeURIComponent(hotelNameFromURL) }));
    }

    fetchUserId();
  }, [searchParams]);

  // Handle form submission
  const handleSubmit = async (event, status) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:3000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...formData, status }),
      });

      if (response.ok) {
        setMessage({
          open: true,
          text: status === "complete" ? "Booking completed successfully" : "Booking saved as draft",
          severity: "success",
        });
        setFormData({ ...formData, check_in: "", check_out: "", guest: "", payment: "" });
      } else {
        setMessage({ open: true, text: "Error processing booking", severity: "error" });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage({ open: true, text: "An error occurred", severity: "error" });
    }
  };
 
  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 5, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Booking Form
        </Typography>
        <form onSubmit={(e) => handleSubmit(e, "draft")}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="User ID" value={formData.user_id} InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Hotel Name" value={formData.hotel_name} InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Check-In Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.check_in}
                onChange={(e) => setFormData({ ...formData, check_in: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Check-Out Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.check_out}
                onChange={(e) => setFormData({ ...formData, check_out: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Guests"
                type="number"
                value={formData.guest}
                onChange={(e) => setFormData({ ...formData, guest: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                fullWidth
                value={formData.room_type}
                onChange={(e) => setFormData({ ...formData, room_type: e.target.value })}
              >
                <MenuItem value="Single">Single</MenuItem>
                <MenuItem value="Double">Double</MenuItem>
                <MenuItem value="Suite">Suite</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Payment (Optional)"
                type="number"
                value={formData.payment}
                onChange={(e) => setFormData({ ...formData, payment: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth variant="contained" color="secondary" type="submit">
                Save
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth variant="contained" color="primary" onClick={(e) => handleSubmit(e, "complete")}>
                Complete
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth variant="outlined" color="inherit" onClick={handleBackToDashboard} sx={{ mt: 2 }}>
                Back to Dashboard
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Snackbar for notifications */}
      <Snackbar open={message.open} autoHideDuration={3000} onClose={() => setMessage({ ...message, open: false })}>
        <Alert severity={message.severity}>{message.text}</Alert>
      </Snackbar>
    </Container>
  );
};

export default BookingForm;
