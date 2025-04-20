const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExcpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { validateReview , isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");



//post route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.reviewPost));
  
//Delete review route
router.delete("/:reviewId",isLoggedIn, isReviewAuthor , wrapAsync(reviewController.reviewDelete));


module.exports = router;