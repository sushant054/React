# Hotel Booking and Recommendation System

## Overview
The Hotel Booking and Recommendation System is built using **React**, **Material-UI**, **Node.js**, and **MySQL**. The system allows users to register, log in, book hotels, and manage their bookings while ensuring secure authentication and role-based access.
 
## Pages & Routes

### 1. **Authentication Pages**
- **Login (`/`)** - User login page.
- **Signup (`/signup`)** - New user registration.
- **Forgot Password (`/forgot-password`)** - Password recovery functionality.

### 2. **Dashboard (`/dashboard`)**
- Accessible only after authentication.
- Displays available hotels and booking options.

### 3. **Booking Page (`/booking`)**
- Allows users to book hotels by filling out a form.
- Uses Material-UI components for a better UI experience.

### 4. **Show Bookings (`/show-bookings`)**
- Displays user bookings with options to manage or cancel them.
- Ensures only authenticated users can access this page.

## Private Route Protection
- Implemented a `PrivateRoute` component that checks for a valid authentication token stored in `localStorage`.
- Users who are not logged in will be redirected to the login page.

## Features
- **User Authentication:** Secure login and signup using JWT.
- **Material-UI Components:** Used for enhanced UI/UX.
- **Hotel Booking:** Users can book hotels through an interactive form.
- **Dashboard with Recommendations:** Displays hotel recommendations.
- **Protected Routes:** Only authenticated users can access booking-related pages.
- **MySQL Database:** Stores user and booking details.

 