'use strict';

const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
// const server = 'localhost';
// const listingsDB = 'listings_db';
// const db = require('./lib/connectMongoose')
// const Listing = require('../../models/Listing')

//Error or success console notifications
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'error de conexion:'));
// db.once('open', function () {
//     console.log('Conectado a la base de datos');
// });

//Connecting to database
// mongoose.connect(`mongodb://${server}/${listingsDB}`);

/* GET home page. */
// router.get('/listings', function (req, res, next) {
//     res.locals.title = 'Nodepop';
//     Listing.find({}, function (err, listings) {
//         if (err) console.error(err);
//         res.locals.db = listings;
//         res.render('index');
//     })
// });

router.get('/listings', async (req, res, next) => {
    try {
        // Input values
        const tag = req - query.tag;
        const name = req.query.name;
        const forSale = req.query.sale;
        const price = req.query.price;
        const photo = req.query.photo;
        const skip = parseInt(req.query.skip);
        const limit = parseInt(req.query.limit);
        // const fields = req.query.fields;
        const sort = req.query.sort;

        const filter = {};

        if (tag) filter.tag = tag;
        if (name) filter.name = name;
        if (sale) filter.forSale = sale;
        if (price) filter.name = price;
        if (photo) filter.name = photo;

        // buscamos agentes en la base de datos
        const listings = await Agente.list(filter, skip, limit, fields, sort);

        res.json({
            success: true,
            results: listings
        });

    } catch (err) {
        next(err);
        return;
    }
});

// Create a listing
router.post('/', async (req, res, next) => {
    try {
        const data = req.body;

        const agente = new Listing(data);

        const savedListing = await agente.save();

        res.json({
            success: true,
            result: savedListing
        });

    } catch (err) {
        next(err);
        return;
    }
});

// Get tags
router.get('/tags', async (req, res, next) => {
    try {
        res.json({
            success: true,
            results: {
                tags: ["work", "lifestyle", "motor", "mobile"]
            }
        });

    } catch (err) {
        next(err);
        return;
    }
});

module.exports = router;