const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");

// Require from the controller file
const reviewController = require("../controllers/reviews.js");

// POST route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createreview));

// DELETE route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;
