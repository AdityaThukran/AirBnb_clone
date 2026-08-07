const express = require("express");
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const Listing = require('../models/listing');
const Booking = require("../models/booking"); // Ensure this is imported
const { isLoggedIn, isOwner, validateListing } = require('../middleware');
const ListingController = require('../controllers/listings');
const Conversation = require('../models/conversation');
const multer = require('multer')
const { storage } = require('../cloudConfig');
const upload = multer({ storage });

// Listing Routes
router
    .route("/")
    .get(wrapAsync(ListingController.index))
    .post(
        isLoggedIn,
        upload.array('listing[img]', 5),
        validateListing,
        wrapAsync(ListingController.createListing)
    );

// Route to create a new listing
router.get('/new', isLoggedIn, ListingController.renderNewForm);

router.route("/:id")
    .get(wrapAsync(ListingController.showListing))
    .put
    (
        isLoggedIn,
        isOwner,
        upload.array('listing[img]', 5),
        validateListing,
        wrapAsync(ListingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(ListingController.destroyListing));

// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(ListingController.renderEditform));

// --- UPDATED BOOKING ROUTE ---
router.post('/:id/bookings', isLoggedIn, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "The listing you are trying to book does not exist!");
        return res.redirect("/listings");
    }

    // 1. Destructure checkIn, checkOut, AND guests from the body
    // This fixes the 'Path guests is required' validation error
    const { checkIn, checkOut, guests } = req.body.booking;

    // 2. Calculate the number of nights
    let date1, date2;
    if (checkIn && checkIn.includes(' to ')) {
        const parts = checkIn.split(' to ');
        date1 = new Date(parts[0]);
        date2 = new Date(parts[1] || checkOut);
    } else {
        date1 = new Date(checkIn);
        date2 = new Date(checkOut);
    }

    // Safety check: ensure checkout is after checkin and not invalid
    if (isNaN(date1.getTime()) || isNaN(date2.getTime()) || date2 <= date1) {
        req.flash('error', 'Please select valid Check-in and Checkout dates!');
        return res.redirect(`/listings/${id}`);
    }

    const timeDifference = Math.abs(date2 - date1);
    const nights = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    // 3. Calculate total price
    const totalPrice = nights * listing.price;

    // 4. Create the new booking with the guests field included
    const newBooking = new Booking({
        listing: listing._id,
        author: req.user._id,
        checkIn: date1,
        checkOut: date2,
        guests: guests,
        totalPrice: totalPrice
    });

    // 5. Save and Redirect
    await newBooking.save();
    console.log("✅ New Booking Saved:", newBooking);

    // 6. Auto-message the host about the new booking
    try {
        const hostId = listing.owner._id || listing.owner;
        const guestId = req.user._id;

        if (hostId.toString() !== guestId.toString()) {
            // Find existing conversation or create a new one
            let convo = await Conversation.findOne({
                participants: { $all: [guestId, hostId] },
                listing: listing._id
            });

            if (!convo) {
                convo = new Conversation({
                    participants: [guestId, hostId],
                    listing: listing._id,
                    messages: []
                });
            }

            const checkInStr = date1.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
            const checkOutStr = date2.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

            convo.messages.push({
                sender: guestId,
                content: `Hi! I just booked your listing "${listing.title}" from ${checkInStr} to ${checkOutStr} for ${guests} guest${guests > 1 ? 's' : ''}. Looking forward to my stay! Total: ₹${totalPrice.toLocaleString('en-IN')}.`,
                isRead: false
            });
            convo.lastMessage = Date.now();
            await convo.save();
        }
    } catch (msgErr) {
        console.error("Failed to auto-message host:", msgErr);
        // Don't block the booking if messaging fails
    }

    req.flash('success', 'Successfully booked your stay! A message was sent to the host.');
    res.redirect(`/listings/${listing._id}`);
}));

module.exports = router;