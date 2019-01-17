'use strict';

const mongoose = require('mongoose');
const server = 'localhost';
const listingsDB = 'listings_db';
const Listing = require('./models/Listing')
const fs = require('fs');
const json = JSON.parse(fs.readFileSync('./listings.json', 'utf8'));

//Connecting to database
mongoose.connect(`mongodb://${server}/${listingsDB}`);

//Error and success handlers
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error de conexion:'));
db.once('open', function () {
    console.log('Conectado a la base de datos');
    Listing.deleteMany({}, function (err) {
        if (err) return console.error(err);
        console.log('Borrados todos los registros de la base de datos...');
        Listing.insertMany(json, function (err) {
            if (err) return console.error(err);
            console.log('Insertados todos los registros iniciales en la base de datos...')
            Listing.find(function (err, listings) {
                if (err) return console.error(err);
                console.log('Mostrando registros insertados:');
                console.log(listings);
                console.log('Cerrando base de datos...');
                db.close();
            })
        })
    });
});