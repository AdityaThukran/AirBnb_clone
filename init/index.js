require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');

const dbUrl = process.env.ATLASDB_URL;

if (!dbUrl) {
    console.error("❌ ATLASDB_URL not found in .env file. Please set it and try again.");
    process.exit(1);
}

main()
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => { console.error('❌ MongoDB error:', err); process.exit(1); });

async function main() {
    await mongoose.connect(dbUrl);
}

const initDB = async () => {
    await Listing.deleteMany({});
    console.log("🗑️  Cleared existing listings");

    const listings = initData.data.map(obj => ({
        ...obj,
        // No owner set — listings appear as "hosted by Wanderlust"
    }));

    await Listing.insertMany(listings);
    console.log(`✅ Inserted ${listings.length} sample listings successfully!`);
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
};

initDB();