'use strict';

const mongoose = require('mongoose');
const readline = require('readline');
const server = 'localhost';
const listingsDB = 'listings_db';
const Listing = require('./models/Listing');
const fs = require('fs');
const json = JSON.parse(fs.readFileSync('./listings.json', 'utf8'));

//Connecting to database
mongoose.connect(`mongodb://${server}/${listingsDB}`, {
    useNewUrlParser: true
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

        const deleted = await Listing.deleteMany();
        console.log(`Borrados todos los registros (${deleted.n} documentos en total) de la base de datos...`);
        const inserted = await Listing.insertMany(json);
        console.log(`Insertados ${inserted.length} registros iniciales en la base de datos...`);
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