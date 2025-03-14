const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking"); // Your Booking model
const User = require("../models/user"); // Your User model

// Route to render the user dashboard
router.get("/dashboard", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login"); // Redirect to login if user is not authenticated
  }

  try {
    // Get the logged-in user from the session
    const user = req.user;

    // Get bookings of the logged-in user
    const bookings = await Booking.find({ user: user._id }).populate('listing');

    // Render the dashboard view and pass the user and bookings data
    res.render("bookings/userbooking", { user, bookings });
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
