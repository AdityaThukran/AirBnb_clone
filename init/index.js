require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');
const User = require('../models/user.js');

const dbUrl = process.env.ATLASDB_URL;
if (!dbUrl) { console.error("❌ ATLASDB_URL missing"); process.exit(1); }

main().then(() => console.log('✅ MongoDB connected')).catch(err => { console.error('❌', err); process.exit(1); });
async function main() { await mongoose.connect(dbUrl); }

const initDB = async () => {
    // Create or find a system host user
    let systemUser = await User.findOne({ username: 'wanderlust_host' });
    if (!systemUser) {
        systemUser = new User({
            email: 'host@wanderlust.com',
            username: 'wanderlust_host',
            avatarUrl: 'https://a0.muscache.com/defaults/user_pic-225x225.png?v=3',
            isSuperHost: true,
            joinedDate: new Date('2020-01-01'),
            responseRate: 100,
            languages: ['English', 'Spanish', 'French']
        });
        await User.register(systemUser, 'wanderlust123');
        console.log('✅ Created system host user');
    } else {
        console.log('✅ Found existing system host user');
    }

    await Listing.deleteMany({});
    console.log('🗑️  Cleared existing listings');

    const listings = initData.data.map(obj => ({
        ...obj,
        owner: systemUser._id
    }));

    await Listing.insertMany(listings);
    console.log(`✅ Inserted ${listings.length} listings with owner assigned!`);
    await mongoose.disconnect();
    console.log('🔌 Disconnected');
};

initDB();