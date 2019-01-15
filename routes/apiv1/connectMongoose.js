'use strict';

const mongoose = require('mongoose');

//Defining database schema and model
const listingSchema = new mongoose.Schema({
    name: String,
    forSale: Boolean,
    price: Number,
    photo: String,
    tags: [String]
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing