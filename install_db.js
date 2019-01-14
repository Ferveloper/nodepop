'use strict';

const fs = require('fs');
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

//Defining database schema and model
const listingSchema = new mongoose.Schema({
    name: String,
    forSale: Boolean,
    price: Number,
    photo: String,
    tags: [String]
});

const Listing = mongoose.model('Listing', listingSchema)

//Deleting existing database entries and inserting new ones
var json = JSON.parse(fs.readFileSync('./listings.json', 'utf8'));

Listing.deleteMany({}, function (err) {
    if (err) return console.error(err);
    console.log('Borrados todos los registros de la base de datos...');
    Listing.insertMany(json, function (err) {
        if (err) return console.error(err);
        console.log('Insertados todos los registros iniciales en la base de datos...')
        Listing.find(function (err, listings) {
            if (err) return console.error(err);
            console.log('Mostrando registros insertados:')
            console.log(listings);
        })
    })
});
