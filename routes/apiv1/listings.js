'use strict';

const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
// const server = 'localhost';
// const listingsDB = 'listings_db';
const db = require('./lib/connectMongoose')
const Listing = require('./models/Listing')

//Error or success console notifications
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'error de conexion:'));
// db.once('open', function () {
//     console.log('Conectado a la base de datos');
// });

//Connecting to database
// mongoose.connect(`mongodb://${server}/${listingsDB}`);

/* GET home page. */
router.get('/listings', function (req, res, next) {
    res.locals.title = 'Nodepop';
    Listing.find({}, function (err, listings) {
        // let limit = 10;
        // res.locals.db = pagination(listings, limit);
        if (err) console.error(err);
        res.locals.db = listings;
        res.render('index');
    })
});

module.exports =  Listing;