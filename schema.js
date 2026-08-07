const Joi = require("joi");

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().required().min(0),
    image: Joi.any().optional(),
    img: Joi.any().optional(),
    amenities: Joi.array().items(Joi.string()).optional(),
    category: Joi.string().valid(
      "Rooms",
      "Iconic cities",
      "Mountains",
      "Castles",
      "Amazing pools",
      "Camping",
      "Farms",
      "Arctic",
      "Domes",
      "Boats",
      "Huts",
      "Tropical",
      "Beachfront",
      "Lakefront"
    ).required(),
  }).required(),

  // THE FIX: This must be outside the 'listing' object!
  deleteImages: Joi.any().optional()
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    cleanliness: Joi.number().min(1).max(5).optional(),
    accuracy: Joi.number().min(1).max(5).optional(),
    communication: Joi.number().min(1).max(5).optional(),
    location: Joi.number().min(1).max(5).optional(),
    checkIn: Joi.number().min(1).max(5).optional(),
    value: Joi.number().min(1).max(5).optional(),
    comment: Joi.string().required(),
  }).required(),
});