const Listing = require('../models/listing');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
  try {
    let filter = {};
    let currentCategory = req.query.category; // Get category from URL
    let searchQuery = req.query.q;            // Get search from URL

    // 1. Add Category filter if it exists
    if (currentCategory && currentCategory.trim() !== "") {
      filter.category = currentCategory.trim();
    }

    // 2. Add Search filter if it exists
    if (searchQuery && searchQuery.trim() !== "") {
      searchQuery = searchQuery.trim();
      filter.$or = [
        { title: { $regex: searchQuery, $options: "i" } },
        { location: { $regex: searchQuery, $options: "i" } },
        { country: { $regex: searchQuery, $options: "i" } }
      ];
    }

    // 3. Find listings based on the combined filter
    const allListings = await Listing.find(filter);

    // 4. Handle "No Results"
    if (allListings.length === 0) {
      if (searchQuery) {
        req.flash("error", "No listings found for your search.");
      } else if (currentCategory) {
        req.flash("error", `No listings found in the "${currentCategory}" category.`);
      }
    }
    
    // 5. Render the page
    res.render("listings/index.ejs", { allListings });

  } catch (e) {
    req.flash("error", "Something went wrong.");
    res.redirect("/listings");
  }
};

module.exports.renderNewForm = (req, res) => {
    res.render('listings/new.ejs');
}

module.exports.showListing =  async (req,res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id)
    .populate({
        path: "reviews",
        populate: {
            path: "author"
        }})
    .populate("owner");
    if(!listing){
       req.flash('error', 'Cannot find that listing!');
       return res.redirect("/listings");
    };
    console.log(listing);
    res.render("listings/show.ejs", { listing });
}

module.exports.createListing = async (req, res) => {
    let response = await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 1
  })
    .send();
  
    let url = req.file.path;
    let filename = req.file.filename;
   
     const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };

    newListing.geometry = response.body.features[0].geometry;

    let savedListing = await newListing.save();
    console.log(savedListing);
    req.flash('success', 'Successfully made a new listing!');
    res.redirect('/listings');
 }

 module.exports.renderEditform = async (req, res) => {
     let { id } = req.params;
     let listing = await Listing.findById(id);
     if(!listing){
        req.flash('error', 'Cannot find that listing!');
        return res.redirect("/listings");
     }
     let orignalImageUrl = listing.image.url;
     orignalImageUrl = orignalImageUrl.replace("/upload","/upload/w_200,h_180,c_fill/");

     res.render("listings/edit.ejs", { listing, orignalImageUrl });
 }

 module.exports.updateListing = async (req, res) => {
  try {
    let { id } = req.params;

    // 1. ADD THIS BLOCK: Run geocoding on the new location
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location, // Gets new location from edit form
        limit: 1
    }).send();

    // 2. Save the new coordinates back into the listing object
    req.body.listing.geometry = response.body.features[0].geometry;


    // 3. Your original code: Update the listing
    // This will now include the new geometry from step 2
    let updatedListing = await Listing.findByIdAndUpdate(
      id,
      { ...req.body.listing },
      { new: true, runValidators: true }
    );

    // 4. Your original code: Check for new image
    if (typeof req.file !== 'undefined') {
      let url = req.file.path;
      let filename = req.file.filename;

      updatedListing.image = { url, filename };
      await updatedListing.save();
    }

    req.flash('success', 'successfully updated a listing!');
    res.redirect(`/listings/${id}`);

  } catch (err) {
    // This catch block is important! If geocoding fails
    // (e.g., location is "asdfgh"), it will stop the crash.
    console.error(err);
    req.flash("error", "Failed to update. Could not find location.");
    res.redirect(`/listings/${id}/edit`);
  }
};

module.exports.destroyListing =  async (req, res) => { 
    try {
        let { id } = req.params;
        await Listing.findByIdAndDelete(id);
        req.flash('success', 'Successfully deleted a listing!');
        res.redirect("/listings");
    } catch (err) {
        console.error(err);
        res.status(500).send("Delete failed");
    }
}