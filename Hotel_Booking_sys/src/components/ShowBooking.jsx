import React, { useEffect, useState } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ShowBookings = () => {
  const [bookings, setBookings] = useState([]);

  // Fetch user ID
  const fetchUserId = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/user-id", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      return data.user_id;
    } catch (error) {
      console.error("Error fetching user ID:", error);
    }
  };

  // Fetch bookings
  const fetchBookings = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/bookings?user_id=${userId}`);
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  // Handle deletion
  const handleDelete = async (bookingId) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        const response = await fetch(`http://localhost:3000/api/bookings/${bookingId}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Failed to delete booking");

        // Refresh bookings after deletion
        const userId = await fetchUserId();
        if (userId) fetchBookings(userId);
      } catch (error) {
        console.error("Error deleting booking:", error);
      }
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchUserId().then((userId) => {
      if (userId) fetchBookings(userId);
    });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 2 }}
        onClick={() => window.history.back()}
      >
        Back
      </Button>

      <Paper sx={{ p: 3, boxShadow: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Your Bookings
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#1976d2", color: "white" }}>
                <TableCell sx={{ color: "white" }}>Booking ID</TableCell>
                <TableCell sx={{ color: "white" }}>Hotel Name</TableCell>
                <TableCell sx={{ color: "white" }}>Check In</TableCell>
                <TableCell sx={{ color: "white" }}>Check Out</TableCell>
                <TableCell sx={{ color: "white" }}>Guests</TableCell>
                <TableCell sx={{ color: "white" }}>Room Type</TableCell>
                <TableCell sx={{ color: "white" }}>Payment</TableCell>
                <TableCell sx={{ color: "white" }}>Status</TableCell>
                <TableCell sx={{ color: "white" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    No bookings found.
                  </TableCell>
                </TableRow>
              ) : (
                bookings.map((booking) => (
                  <TableRow key={booking.booking_id}>
                    <TableCell>{booking.booking_id}</TableCell>
                    <TableCell>{booking.hotel_name}</TableCell>
                    <TableCell>{booking.check_in_date}</TableCell>
                    <TableCell>{booking.check_out_date}</TableCell>
                    <TableCell>{booking.number_of_guests}</TableCell>
                    <TableCell>{booking.room_type}</TableCell>
                    <TableCell>{booking.payment !== null ? `$${booking.payment}` : "N/A"}</TableCell>
                    <TableCell>{booking.status}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDelete(booking.booking_id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default ShowBookings;
