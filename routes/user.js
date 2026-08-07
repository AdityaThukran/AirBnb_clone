const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

const UserController = require('../controllers/users');

router.route("/signup")
    .get(UserController.renderSignupForm)
    .post(wrapAsync(UserController.signup));

router.route("/login")
    .get(UserController.renderLoginForm)
    .post(
        saveRedirectUrl,
        passport.authenticate("local", {
            failureFlash: true,
            failureRedirect: "/login"
        }),
        UserController.login
    );


router.get("/logout", UserController.logout);

// Wishlist Routes
const { isLoggedIn } = require("../middleware");
router.post("/wishlist/:id", isLoggedIn, wrapAsync(UserController.toggleWishlist));
router.get("/wishlists", isLoggedIn, wrapAsync(UserController.renderWishlists));

module.exports = router;