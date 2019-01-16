'use strict';

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
mongoose.connect(`mongodb://${server}/${listingsDB}`, { useNewUrlParser: true });

module.exports = db