const Listing = require('../models/listing');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
    try {
        let filter = {};
        let currentCategory = req.query.category || "";
        let searchQuery = req.query.q;
        let sortQuery = req.query.sort || "";
        let maxPrice = parseInt(req.query.maxPrice) || 0;

        if (currentCategory && currentCategory.trim() !== "") {
            filter.category = currentCategory.trim();
        }

        if (searchQuery && searchQuery.trim() !== "") {
            searchQuery = searchQuery.trim();
            filter.$or = [
                { title: { $regex: searchQuery, $options: "i" } },
                { location: { $regex: searchQuery, $options: "i" } },
                { country: { $regex: searchQuery, $options: "i" } }
            ];
        }

        if (maxPrice > 0) {
            filter.price = { $lte: maxPrice };
        }

        // Build sort object
        let sortObj = {};
        if (sortQuery === "price_asc") sortObj = { price: 1 };
        else if (sortQuery === "price_desc") sortObj = { price: -1 };
        else if (sortQuery === "newest") sortObj = { createdAt: -1 };
        else sortObj = { createdAt: -1 }; // default: newest first

        const allListings = await Listing.find(filter).sort(sortObj);

        res.render("listings/index.ejs", {
            allListings,
            currentCategory,
            currentSort: sortQuery,
            currentMaxPrice: maxPrice,
            title: "Wanderlust | Explore Amazing Places"
        });
    } catch (e) {
        req.flash("error", "Something went wrong.");
        res.redirect("/listings");
    }
};

module.exports.renderNewForm = (req, res) => {
    // Standardize title for the browser tab
    res.render('listings/new.ejs', { title: "Wanderlust | Host your home" });
}

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner");

    if (!listing) {
        req.flash('error', 'Cannot find that listing!');
        return res.redirect("/listings");
    };

    console.log("Listing Coordinates:", listing.geometry?.coordinates);
    console.log("Listing Title:", listing.title);

    res.render("listings/show.ejs", {
        listing,
        title: `Wanderlust | ${listing.title}`
    });
}

module.exports.createListing = async (req, res) => {
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
    }).send();

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;

    if (response.body.features.length > 0) {
        newListing.geometry = response.body.features[0].geometry;
    } else {
        req.flash("error", "Invalid location provided.");
        return res.redirect("/listings/new");
    }

    if (req.files && req.files.length > 0) {
        newListing.image = req.files.map(file => ({
            url: file.path,
            filename: file.filename
        }));
    }

    await newListing.save();
    req.flash('success', 'Successfully made a new listing!');
    res.redirect('/listings');
}

module.exports.renderEditform = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash('error', 'Cannot find that listing!');
        return res.redirect("/listings");
    }

    let orignalImageUrl = "";
    if (listing.image && listing.image.length > 0) {
        orignalImageUrl = listing.image[0].url;
        // Cloudinary thumbnail transformation
        orignalImageUrl = orignalImageUrl.replace("/upload", "/upload/w_200,h_150,c_fill/");
    }

    res.render("listings/edit.ejs", {
        listing,
        orignalImageUrl,
        title: `Edit | ${listing.title}`
    });
}

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    try {
        let listing = await Listing.findById(id);
        if (!listing) {
            req.flash("error", "Listing not found!");
            return res.redirect("/listings");
        }

        // Update Geocoding
        let response = await geocodingClient.forwardGeocode({
            query: req.body.listing.location,
            limit: 1
        }).send();

        if (response.body.features.length > 0) {
            listing.geometry = response.body.features[0].geometry;
        }

        // Update Text fields
        listing.title = req.body.listing.title;
        listing.description = req.body.listing.description;
        listing.price = req.body.listing.price;
        listing.location = req.body.listing.location;
        listing.country = req.body.listing.country;
        listing.category = req.body.listing.category;

        // Update Amenities (checkboxes: empty array if none checked)
        const rawAmenities = req.body.listing.amenities;
        if (Array.isArray(rawAmenities)) {
            listing.amenities = rawAmenities;
        } else if (typeof rawAmenities === 'string' && rawAmenities.trim()) {
            listing.amenities = [rawAmenities];
        } else {
            listing.amenities = [];
        }

        // Multi-image deletion logic
        if (req.body.deleteImages) {
            let deletedImages = Array.isArray(req.body.deleteImages) ? req.body.deleteImages : [req.body.deleteImages];
            listing.image = listing.image.filter(img => !deletedImages.includes(img.filename));
            listing.markModified('image');
        }

        // Append new images
        if (req.files && req.files.length > 0) {
            let newImages = req.files.map(file => ({
                url: file.path,
                filename: file.filename
            }));

            if (!Array.isArray(listing.image)) {
                listing.image = [];
            }

            listing.image.push(...newImages);
            listing.markModified('image');
        }

        await listing.save();
        req.flash('success', 'Successfully updated listing!');
        res.redirect(`/listings/${id}`);

    } catch (err) {
        req.flash("error", "Failed to update listing.");
        res.redirect(`/listings/${id}/edit`);
    }
};

module.exports.destroyListing = async (req, res) => {
    try {
        let { id } = req.params;
        await Listing.findByIdAndDelete(id);
        req.flash('success', 'Successfully deleted a listing!');
        res.redirect("/listings");
    } catch (err) {
        res.status(500).send("Delete failed");
    }
}