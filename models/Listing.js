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

listingSchema.statics.list = (filter, skip, limit, fields, sort) => {
  const query = Listing.find(filter);
  query.skip(skip);
  query.limit(limit);
  query.select(fields);
  query.sort(sort);
  return query.exec();
};

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing