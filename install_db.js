'use strict';

const mongoose = require('mongoose');
const server = 'localhost';
const listingsDB = 'listings_db';

//Error or success console notifications
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error de conexion:'));
db.once('open', function () {
    console.log('Conectado a la base de datos');
    // mongoose.connection.db.collectionNames(function (err, names) {
    //     console.log(names); // [{ name: 'dbname.myCollection' }]
    // });
});

//Connecting to database
mongoose.connect(`mongodb://${server}/${listingsDB}`);

//Defining database schema
const listingSchema = new mongoose.Schema({
    name: String,
    forSale: Boolean,
    price: Number,
    photo: String,
    tags: [String]
});

const Listing = mongoose.model('Listing', listingSchema)

//Deleting existing database entries and inserting new ones

const anuncio = new Listing({
    name: 'Bicicleta',
    forSale: true,
    price: 150,
    photo: '',
    tags: ['lifestyle']
})

// Listing.remove({},function (err) {
//     if (err) return handleError(err);
//     console.log('Borrado')
//   });

console.log(anuncio)
anuncio.save(function (err) {
    if (err) return handleError(err);
    console.log('Guardado')
  });


Listing.find(function (err, listings) {
    if (err) return console.error(err);
    console.log(listings);
  })