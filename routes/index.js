'use strict';

const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');

/* GET home page. */
router.get('/', async (req, res, next) => {
  // const Listing = require('../models/Listing');

  // Listing.find({}, function (err, listings) {
  //   if (err) console.error(err);
  //   res.locals.db = listings;
  //   res.render('index');
  // })

  try {
    // Input values
    const tag = req.query.tag;
    const name = req.query.name;
    const forSale = req.query.sale;
    const price = req.query.price;
    const photo = req.query.photo;
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const fields = req.query.fields;
    const sort = req.query.sort;

    const filter = {};

    if (tag) filter.tag = tag;
    if (name) filter.name = name;
    if (forSale) filter.forSale = sale;
    if (price) filter.price = price;
    if (photo) filter.photo = photo;

    // buscamos agentes en la base de datos
    const listings = await Listing.list(filter, skip, limit, fields, sort);

    res.locals.title = 'Nodepop';
    res.locals.db = listings;
    res.render('index');

  } catch (err) {
    next(err);
    return;
  }

});

module.exports = router;