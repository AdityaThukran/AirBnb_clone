const Joi = require("joi");

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().required().min(0),
    img: Joi.string().allow(""), // Kept your original img validation

    // --- ADD THIS FIELD ---
    category: Joi.string().valid(
      "Rooms",
      "Iconic cities",
      "Castles",
      "Amazing pools",
      "Camping",
      "Farms",
      "Arctic",
      "Domes",
      "Boats"
    ).required(),
    // ------------------------
    
  }).required(),
});

module.exports.reviewSchema = Joi.object({
  // ... (your review schema) ...
});