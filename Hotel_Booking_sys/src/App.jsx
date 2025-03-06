// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import BookingForm from "./components/BookingForm";
// import Login from "./components/Login";
// import Signup from "./components/signup";
// import Dashboard from "./components/Dashboard";
// import ForgotPassword from "./components/ForgotPassword";
// import ShowBookings from "./components/ShowBooking";

// const PrivateRoute = ({ children }) => {
//   const token = localStorage.getItem("token");  
//   return token ? children : <Navigate to="/" />; 
// };
// //routes in sep. file
// // const login_route = [{
// //   name: 'Login,
// //  path:'/login' ',
// //  comp: Login,
// //  isNew: true,
// // }]

// // const user_route = [{
// //   name: 'Login,
// //  path:'/users' ',
// //  comp: Login
// // }]
// // cost all_routes = [
// //   ...login_route,
// //   ...user_route
// // ]
// // getRoutes(routes)={
// //   return routes.am(=>{
// //     <Route path="/signup" element={<Signup />} />
// //   })
// // }
// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
// {/* {getRoutes(all_routes)} */}
//         <Route 
//           path="/dashboard" 
//           element={
//             <PrivateRoute>
//               <Dashboard />
//             </PrivateRoute>
//           } 
//         />
//         <Route 
//           path="/booking" 
//           element={
//             <PrivateRoute>
//               <BookingForm />
//             </PrivateRoute>
//           } 
//         />
//         <Route 
//           path="/show-bookings" 
//           element={
//             <PrivateRoute>
//               <ShowBookings />
//             </PrivateRoute>
//           } 
//         />
//       </Routes>
//     </Router>
//   );
// };

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes"; // Import the routes array

const App = () => {
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
};

export default App;