'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const server = 'localhost';
const listingsDB = 'listings_db';
const Listing = require('./apiv1/connectMongoose')

//Error or success console notifications
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error de conexion:'));
db.once('open', function () {
  console.log('Conectado a la base de datos');
});

//Connecting to database
mongoose.connect(`mongodb://${server}/${listingsDB}`);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.locals.title = 'Nodepop';
  Listing.find({}, function (err, listings) {
    // let limit = 10;
    // res.locals.db = pagination(listings, limit);
    if (err) console.error(err);
    res.locals.db =listings;
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

// function pagination(arr, limit) {
// var newArr = [];
// var tempArr = [];
// arr.forEach((e,i)=>{
//   if (i % limit === 0 || i === 0) tempArr = []
//   tempArr.push(e)
//   if ((i+1) % limit === 0 || (i+1) === arr.length) newArr.push(tempArr)
// })

// console.log(newArr)
// }

module.exports = router;
