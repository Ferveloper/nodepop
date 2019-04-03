'use strict';

const mongoose = require('mongoose');

//Error or success console notifications
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error de conexion:'));
db.once('open', function () {
  console.log('Conectado a la base de datos');
});

//Connecting to database
mongoose.connect(`mongodb://${process.env.SERVER}/${process.env.DB}`, { useNewUrlParser: true, useCreateIndex: true });

module.exports = db;