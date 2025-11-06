if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path'); // For serving static files
const methodOverride = require('method-override'); // For PUT and DELETE requests
const ejsMate = require('ejs-mate');  // For rendering EJS templates
const ExpressError = require('./utils/ExpressError');  // For handling errors
const session = require('express-session');  // For session management
const MongoStore = require('connect-mongo'); // For storing sessions in MongoDB
const flash = require('connect-flash'); // For flash messages
const passport = require('passport');   // For authentication
const LocalStrategy = require('passport-local');    // For local authentication
const User = require('./models/user');  // For user model

const listingRouter = require('./routes/listing'); 
const reviewRouter = require('./routes/review');
const userRouter = require('./routes/user');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method')); // For handling PUT and DELETE requests
app.engine('ejs', ejsMate);  // For rendering EJS templates

const dbUrl = process.env.ATLASDB_URL;


const store = MongoStore.create({    // For storing sessions in MongoDB
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24 * 3600 // time period in seconds
});

store.on("error", function(e){
    console.log("SESSION STORE ERROR", e)
});

const sessionOptions = ({             // For session management
    store: store,
    secret: process.env.SECRET,
    resave: false,                                    
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + (1000 * 60 * 60 * 24 * 7),
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
});



app.use(session(sessionOptions));   // For session management
app.use(flash());                   // For flash messages

app.use(passport.initialize());     // For authentication
app.use(passport.session());        // For authentication

passport.use(new LocalStrategy(User.authenticate()));   // For local authentication
passport.serializeUser(User.serializeUser());           // For local authentication
passport.deserializeUser(User.deserializeUser());       // For local authentication


main()
    .then(() => {
        console.log('MongoDB connected successfully')
    }).catch(err => { 
        console.error('MongoDB connection error:', err)
    });
    
// Connect to MongoDB
async function main() {
        await mongoose.connect(dbUrl)
};

// app.get('/', (req, res) => {
//   res.send('Welcome to the AirBnb Clone!');
// });

app.use((req, res, next) => {  // For flash messages
    res.locals.success = req.flash('success');  
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;  // For authentication
    next();
});

app.use('/listings', listingRouter);
app.use('/listings/:id/reviews', reviewRouter);
app.use('/', userRouter);





app.all('/*splat', (req,res,next) => {  // For handling 404 errors
    next(new ExpressError(404, "Page Not Found"));
});


app.use((err,req,res,next)=> {      // For handling errors
    let {statusCode=500 ,message="Something went wrong!"} = err;
    res.render("listings/error.ejs", { message });
})

// Middleware to serve static files
app.listen("8080", () => {
  console.log("Server is running on port 8080");
});
