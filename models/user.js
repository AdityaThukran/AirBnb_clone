const mongoose = require('mongoose');
const schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatarUrl: {
        type: String,
        default: "https://a0.muscache.com/defaults/user_pic-225x225.png?v=3"
    },
    isSuperHost: {
        type: Boolean,
        default: false
    },
    joinedDate: {
        type: Date,
        default: Date.now
    },
    responseRate: {
        type: Number,
        default: 100
    },
    languages: {
        type: [String],
        default: ['English']
    },
    wishlists: [
        {
            type: schema.Types.ObjectId,
            ref: "Listing"
        }
    ]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);