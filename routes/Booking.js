const express = require("express");
const router = express.Router({ mergeParams: true });
const Booking = require("../models/Booking");
const Listing = require("../models/listing");
const { isLoggedIn } = require("../middleware");


router.get("/", isLoggedIn, async (req, res) => {
    try {
        console.log("🔎 Fetching listing with ID:", req.params.id);
        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            req.flash("error", "Listing not found!");
            return res.redirect("/listings");
        }

        res.render("bookings/book", { listing });
    } catch (err) {
        console.error("❌ Error fetching listing:", err);
        req.flash("error", "Something went wrong!");
        res.redirect("/listings");
    }
});


router.post("/", isLoggedIn, async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            req.flash("error", "Listing not found!");
            return res.redirect("/listings");
        }

        const { checkin, checkout, stay, room } = req.body;
        const checkinDate = new Date(checkin);
        const checkoutDate = new Date(checkout);

        if (checkoutDate <= checkinDate) {
            req.flash("error", "Check-out date must be after check-in date.");
            return res.redirect(`/listings/${req.params.id}/book`);
        }

        const numNights = Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
        const totalAmount = numNights * listing.price;

        const booking = new Booking({
            user: req.user._id,
            listing: listing._id,
            checkin: checkinDate,
            checkout: checkoutDate,
            stay,
            room,
            totalAmount
        });

        await booking.save();
   

        res.redirect(`/bookings/${booking._id}`);
    } catch (err) {
  
        req.flash("error", "Failed to create booking. Try again!");
        res.redirect(`/listings/${req.params.id}/book`);
    }
});

module.exports = router;
