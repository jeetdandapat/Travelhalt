const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

router.get("/:bookingId", async (req, res) => {
    try {
        
        const booking = await Booking.findById(req.params.bookingId)
            .populate("listing")
            .populate("user");

        if (!booking) {
            req.flash("error", "Booking not found!");
            return res.redirect("/listings");
        }

 
        res.render("bookings/details", { booking });

    } catch (err) {
     
        req.flash("error", "Something went wrong!");
        res.redirect("/listings");
    }
});

// Redirect to Payment Page
router.get("/:bookingId/payment", async (req, res) => {
    try {
       

        // Fetch the Booking Details
        const booking = await Booking.findById(req.params.bookingId).populate("listing");

        if (!booking) {
            req.flash("error", "Booking not found!");
            return res.redirect("/listings");
        }

        // Render the Payment Page with Booking Details
        res.render("bookings/payment", { booking });
    } catch (err) {
    
        req.flash("error", "Something went wrong!");
        res.redirect("/listings");
    }
});

// Confirmation Page Route
router.get("/:bookingId/confirmation", async (req, res) => {
    try {
        
        // Get Booking Details
        const booking = await Booking.findById(req.params.bookingId).populate("listing");

        if (!booking) {
            req.flash("error", "Booking not found!");
            return res.redirect("/listings");
        }

        // Render Confirmation Page
        res.render("bookings/confirmation", { booking });
    } catch (err) {
     
        req.flash("error", "Something went wrong!");
        res.redirect("/listings");
    }
});

// Process Payment Route (for handling the Pay Now button)
router.post("/:bookingId/process-payment", async (req, res) => {
    try {
        const { paymentMethod } = req.body;
        const bookingId = req.params.bookingId;
    

        // Find the booking
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            req.flash("error", "Booking not found!");
            return res.redirect("/listings");
        }

     

        // Save payment info to the booking
        booking.paymentStatus = "Paid";
        booking.paymentMethod = paymentMethod;
        booking.paymentDate = new Date();
        await booking.save();

        // Redirect to Confirmation Page with Flash Message
        req.flash("success", "Payment Successful!");
        res.redirect(`/bookings/${bookingId}/confirmation`);
    } catch (err) {
      
        req.flash("error", "Payment failed!");
        res.redirect(`/bookings/${req.params.bookingId}/payment`);
    }
});



module.exports = router;
