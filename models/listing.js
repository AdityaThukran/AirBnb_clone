const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Review = require('./review');

const listingSchema = new schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    country: { type: String, required: true },
    // Standardized as an array to support multiple images
    image: [
        {
            url: String,
            filename: String
        }
    ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        },
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {
        type: String,
        enum: ["Rooms", "Huts", "Tropical", "Beachfront", "Iconic cities", "Mountains", "Castles", "Amazing pools", "Camping", "Farms", "Arctic", "Domes", "Boats"],
        required: true
    },
    geometry: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true }
    },
    amenities: {
        type: [String],
        default: []
    },
}, { timestamps: true });

listingSchema.post('findOneAndDelete', async function (listing) {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;