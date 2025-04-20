const Review = require("../models/review.js");
const Listing = require("../models/listing");

module.exports.reviewPost = async (req, res) =>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
  
    await newReview.save();
    await listing.save();
    req.flash("success", "New Review created Successfully!");
    res.redirect(`/listings/${listing.id}`);
};

module.exports.reviewDelete = async(req, res) =>{
    let {id, reviewId } = req.params;
  
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted Successfully!");
    res.redirect(`/listings/${id}`);
  
};