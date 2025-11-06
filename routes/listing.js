const express = require("express");
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const Listing = require('../models/listing');
const {isLoggedIn, isOwner, validateListing} = require('../middleware');
const ListingController = require('../controllers/listings');
const multer  = require('multer')
const {storage} = require('../cloudConfig');
const upload = multer({ storage });
// Listing Routes


router
.route("/")
.get(wrapAsync(ListingController.index))
.post(
    isLoggedIn,
    upload.single('listing[img]'),
    validateListing,
     wrapAsync( ListingController.createListing)
);


// Route to create a new listing
router.get('/new', isLoggedIn, ListingController.renderNewForm);

router.route("/:id")
.get(validateListing, wrapAsync(ListingController.showListing))
.put
(
    isLoggedIn,
    isOwner,
    upload.single('listing[img]'),
    validateListing,
    wrapAsync( ListingController.updateListing))
.delete(isLoggedIn, isOwner, wrapAsync(ListingController.destroyListing));


// Edit Route
router.get("/:id/edit", validateListing, isLoggedIn, isOwner, wrapAsync( ListingController.renderEditform));


module.exports = router;