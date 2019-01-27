'use strict';

const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');
const applyFilters = require('../lib/applyFilters');

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    // Input values
    const name = req.query.name;
    const forSale = req.query.sale;
    const price = req.query.price;
    const tags = req.query.tag;

    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const sort = req.query.sort;

    const filter = applyFilters(name, forSale, price, tags);

    // Query results as per filters
    const listings = await Listing.list(filter, skip, limit, null, sort);

    res.locals.title = 'Nodepop';
    res.locals.db = listings;
    res.render('index');

  } catch (err) {
    next(err);
    return;
  }

});

module.exports = router;