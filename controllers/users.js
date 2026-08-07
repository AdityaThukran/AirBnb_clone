const User = require("../models/user");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
}

module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to Wanderlust!");
            res.redirect("/listings");
        })
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}


module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
}

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome Back!");
    res.redirect(res.locals.redirectUrl || "/listings");
}

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are logged out!");
        res.redirect("/listings");
    })
}

module.exports.toggleWishlist = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(req.user._id);

    if (!user.wishlists) {
        user.wishlists = [];
    }

    // Check if listing is already in wishlists
    const isWished = user.wishlists.includes(id);

    if (isWished) {
        user.wishlists.pull(id);
    } else {
        user.wishlists.push(id);
    }

    await user.save();

    // Send back JSON for the frontend to update the heart icon dynamically
    res.json({ action: isWished ? 'removed' : 'added' });
};

module.exports.renderWishlists = async (req, res) => {
    const user = await User.findById(req.user._id).populate('wishlists');
    res.render("users/wishlists.ejs", { wishlists: user.wishlists, title: "Wanderlust | Your Wishlists" });
};