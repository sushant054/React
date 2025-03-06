import React from "react"; // Import React for JSX support
import { Navigate } from "react-router-dom";
import BookingForm from "./components/BookingForm";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import ForgotPassword from "./components/ForgotPassword";
import ShowBookings from "./components/ShowBooking";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
};

// Define routes as an array of objects
const routes = [
  { path: "/", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/booking",
    element: (
      <PrivateRoute>
        <BookingForm />
      </PrivateRoute>
    ),
  },
  {
    path: "/show-bookings",
    element: (
      <PrivateRoute>
        <ShowBookings />
      </PrivateRoute>
    ),
  },
];

export default routes;
