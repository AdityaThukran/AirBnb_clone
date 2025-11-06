const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');

const mongo_url = 'mongodb://localhost:27017/wanderlust';

main()
    .then(() => {
        console.log('MongoDB connected successfully')
    })
    .catch(err => { 
        console.error('MongoDB connection error:', err)
    });

// Connect to MongoDB
async function main() {
        await mongoose.connect(mongo_url)
};

const initDB = async () => {
        // Clear existing listings
        await Listing.deleteMany({});

        initData.data = initData.data.map((obj)=> ({
            ...obj,
            owner: "68bee60d9d5352afca94948d"
        }));

        // Insert initial data
        await Listing.insertMany(initData.data);
        console.log('Database initialized with sample data');
    
}

// Start the initialization
initDB()
  