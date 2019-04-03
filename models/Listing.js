'use strict';

const mongoose = require('mongoose');
const jimp = require('jimp');

//Defining database schema and model
const listingSchema = new mongoose.Schema({
  name: String,
  forSale: Boolean,
  price: Number,
  photo: String,
  thumbnail: String,
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

listingSchema.statics.thumbnail = async function (width, height, destination, filename) {
  const image = await jimp.read(`${destination}/${filename}`)
  await image.cover(width, height);
  const dotIndex = filename.lastIndexOf('.');
  const name = filename.substring(0, dotIndex);
  const ext = filename.substring(dotIndex, filename.length);
  const thumbnailName = `${name}-thumbnail_${width}x${height}${ext}`;
  image.write(`${destination}/thumbnails/${thumbnailName}`);
  return thumbnailName;
};

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing