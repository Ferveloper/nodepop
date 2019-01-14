const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const server = 'localhost';
const listingsDB = 'listings_db';

//Error or success console notifications
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error de conexion:'));
db.once('open', function () {
    console.log('Conectado a la base de datos');
});

//Connecting to database
mongoose.connect(`mongodb://${server}/${listingsDB}`);

const listingSchema = new mongoose.Schema({
  name: String,
  forSale: Boolean,
  price: Number,
  photo: String,
  tags: [String]
});

const Listing = mongoose.model('Listing', listingSchema)
Listing.find({}, function(err, listings) {
  console.log(listings)
})
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Nodepop'
  });
});

module.exports = router;
