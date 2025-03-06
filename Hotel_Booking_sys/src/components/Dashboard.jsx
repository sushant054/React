import React, { useState, useEffect } from "react";
import SearchBox from "./SearchBox";
import {
  Typography,
  Paper,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import BookIcon from "@mui/icons-material/Book";
import PhoneIcon from "@mui/icons-material/Phone";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import "./dash.css";

const Dashboard = () => {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [unvisitedHotels, setUnvisitedHotels] = useState([]);

  // List of images available in the folder
  const availableImages = [
    "./src/images/download.jpeg",
    "./src/images/download1.jpeg",
    "./src/images/images.jpeg",
    "./src/images/images1.jpeg",
    "./src/images/images2.jpeg",
    "./src/images/images3.jpeg",
    "./src/images/images4.jpeg",
    "./src/images/images5.jpeg",
    "./src/images/images6.jpeg",
    "./src/images/images7.jpeg",
  ];
  
  // Shuffle images and assign them randomly
  const shuffleImages = (hotels) => {
    let shuffled = [...availableImages].sort(() => Math.random() - 0.5);
    return hotels.map((hotel, index) => ({
      ...hotel,
      image: shuffled[index % shuffled.length], // Assign images randomly
    }));
  };

  // Fetch unvisited hotels from API
  useEffect(() => {
    const fetchUnvisitedHotels = async () => {
      try {
        const userId = 1;
        const response = await axios.get(`http://localhost:3000/api/unvisited-hotels?user_id=${userId}`);
        const hotelsWithImages = shuffleImages(response.data);
        setUnvisitedHotels(hotelsWithImages);
      } catch (error) {
        console.error("Error fetching unvisited hotels:", error);
      }
    };

    fetchUnvisitedHotels();
  }, []);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundImage: "url(/images/h7.jpg)", backgroundSize: "cover" }}>
      {/* Sidebar */}
      <Box sx={{ width: 250, bgcolor: "rgba(0, 0, 0, 0.8)", color: "white", p: 3, boxShadow: 3 }}>
        <Typography variant="h5" align="center" sx={{ mb: 3, fontWeight: "bold" }}>Hotel Booking</Typography>
        <List>
          <ListItem disablePadding>
            <ListItemButton selected>
              <ListItemIcon sx={{ color: "white" }}><HomeIcon /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="/show-bookings">
              <ListItemIcon sx={{ color: "white" }}><BookIcon /></ListItemIcon>
              <ListItemText primary="Bookings" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: "white" }}><PhoneIcon /></ListItemIcon>
              <ListItemText primary="Contact" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: "white" }}><InfoIcon /></ListItemIcon>
              <ListItemText primary="About" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, ml: "0px", p: 3 }}>
        <Paper sx={{ p: 3, mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: 3, bgcolor: "rgba(255, 255, 255, 0.8)" }}>
          <SearchBox onHotelSelect={setSelectedHotel} />  
          <Button
            variant="contained"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
          >
            Logout
          </Button>
        </Paper>

        {/* Selected Hotel Info (from SearchBox) */}
        {selectedHotel && (
          <Paper sx={{ p: 3, mt: 3, boxShadow: 3, bgcolor: "rgba(255, 255, 255, 0.9)" }}>
            <Typography variant="h5">Hotel Details</Typography>
            <Typography><strong>Hotel Name:</strong> {selectedHotel["Hotel Name"]}</Typography>
            <Typography><strong>Category:</strong> {selectedHotel["Category"]}</Typography>
            <Typography><strong>Address:</strong> {selectedHotel["Address"]}</Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              href={`/booking?hotel_name=${encodeURIComponent(selectedHotel["Hotel Name"])}`}
            >
              Book Now
            </Button>
          </Paper>
        )}

        {/* Unvisited Hotels Section */}
        <Typography variant="h4" sx={{ mb: 2, color: "white", fontWeight: "bold" }}>
          Recommended Hotels
        </Typography>
        <Grid container spacing={3}>
          {unvisitedHotels.map((hotel, index) => (

<Grid item xs={12} sm={6} md={4} key={index}>
<Card className="card" sx={{ maxWidth: 345, height: "100%", display: "flex", flexDirection: "column", boxShadow: 5 }}>
  <CardMedia
    component="img"
    height="200"
    image={hotel.image} // Randomly assigned image
    alt={hotel["Hotel Name"]}
    onError={(e) => { e.target.src = "/images/default.jpg"; }} // If image not found, use default
  />
  <CardContent sx={{ flexGrow: 1 }}>  {/* This ensures equal height */}
    <Typography variant="h6" sx={{ fontWeight: "bold" }}>{hotel["Hotel Name"]}</Typography>
    <Typography variant="body2" color="textSecondary">{hotel["Category"]}</Typography>
    <Typography variant="body2" sx={{ mt: 1 }}>{hotel["Address"]}</Typography>
  </CardContent>
  <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
    <Button
      variant="contained"
      color="primary"
      href={`/booking?hotel_name=${encodeURIComponent(hotel["Hotel Name"])}`}
    >
      Book Now
    </Button>
  </Box>
</Card>
</Grid>

          ))}
        </Grid>

        {/* Welcome Content */}
        <Paper sx={{ p: 4, mt: 3, textAlign: "center", boxShadow: 3, bgcolor: "rgba(255, 255, 255, 0.8)" }}>
          <Typography variant="h4" gutterBottom>Welcome to the Hotel Booking System</Typography>
          <Typography variant="body1">Here you can book hotel rooms and manage your bookings.</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
