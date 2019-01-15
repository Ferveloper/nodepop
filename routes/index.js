'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const server = 'localhost';
const listingsDB = 'listings_db';
const Listing = require('../connectMongoose')

//Error or success console notifications
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error de conexion:'));
db.once('open', function () {
  console.log('Conectado a la base de datos');
});

//Connecting to database
mongoose.connect(`mongodb://${server}/${listingsDB}`);

// const listingSchema = new mongoose.Schema({
//   name: String,
//   forSale: Boolean,
//   price: Number,
//   photo: String,
//   tags: [String]
// });

// const Listing = mongoose.model('Listing', listingSchema)

/* GET home page. */
router.get('/', function (req, res, next) {
  res.locals.title = 'Nodepop';
  Listing.find({}, function (err, listings) {
    res.locals.db = listings;
    res.render('index');
  })
  // res.locals.db = [
  //   {
  //     name: "Bicicleta",
  //     forSale: true,
  //     price: 230.15,
  //     photo: "bici.jpg",
  //     tags: ["lifestyle", "motor"]
  //   }
  // ]
});

module.exports = router;
