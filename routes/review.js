const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const Review = require('../models/review');
const Listing = require('../models/listing');

const ReviewController = require('../controllers/reviews');

router.post("/", isLoggedIn, validateReview, wrapAsync(ReviewController.createReview));

// Route to delete a specific review
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(ReviewController.destroyReview));

module.exports = router;