'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const readline = require('readline');
const rimraf = require('rimraf');
const Listing = require('./models/Listing');
const User = require('./models/User')
const fs = require('fs');
const listingsJSON = JSON.parse(fs.readFileSync('./data/listings.json', 'utf8'));
const usersJSON = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));

//Connecting to database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true
});

const db = mongoose.connection;

//Error and open handlers
db.on('error', console.error.bind(console, 'error de conexion:'));
db.once('open', async function () {
  try {
    console.log('Conectado a la base de datos');
    const respuesta = await askUser('¿Estás seguro de que quieres borrar TODA la base de datos? (si/no) ');

    if (respuesta.toLowerCase() !== 'si') {
      console.log('¡Proceso abortado! No se ha borrado la base de datos');
      process.exit(0);
    };

    //Delete existing thumbnails
    rimraf('./public/images/thumbnails/*', function () { console.log('Thumbnails eliminados...'); });

    //Create thumbnails
    for (let i = 0; i < listingsJSON.length; i++) {
      const thumbnailName = await Listing.thumbnail(100, 100, './public/images',listingsJSON[i].photo);
      listingsJSON[i].thumbnail = `thumbnails/${thumbnailName}`;
    }

    const deletedListings = await Listing.deleteMany();
    console.log(`Borrados todos los anuncios (${deletedListings.n} documentos en total) de la base de datos...`);
    const insertedListings = await Listing.insertMany(listingsJSON);
    console.log(`Insertados ${insertedListings.length} anuncios iniciales en la base de datos...`);

    // hash passwords
    // usersJSON.forEach(async (user) => await User.hashPassword(user.password));

    for (let i = 0; i < usersJSON.length; i++) {
      usersJSON[i].password = await User.hashPassword(usersJSON[i].password);
    }

    const deletedUsers = await User.deleteMany();
    console.log(`Borrados todos los usuarios (${deletedUsers.n} documentos en total) de la base de datos...`);
    const insertedUsers = await User.insertMany(usersJSON);
    console.log(`Insertados ${insertedUsers.length} usuarios iniciales en la base de datos...`);

    console.log('¡Proceso realizado con éxito!\nCerrando base de datos...');
    db.close();
  } catch (err) {
    console.error(err);
  };
});

function askUser(question) {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(question, answer => {
      rl.close();
      resolve(answer);
      return;
    });
  });
};