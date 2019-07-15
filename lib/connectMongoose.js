'use strict';

const mongoose = require('mongoose');

//Error or success console notifications
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error de conexion:'));
db.once('open', function () {
  if (process.env.NODE_ENV !== 'test') console.log('Conectado a la base de datos');
});

//Connecting to database
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true });

module.exports = db;