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
    const tag = req.query.tag;
    
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const fields = req.query.fields;
    const sort = req.query.sort;

    const filter = applyFilters(name, forSale, price, tag);

    // if (name) filter.name = new RegExp(`^${name}`, 'i');
    // if (forSale) filter.forSale = forSale;
    // if (price) filter.price = parsePrice(price);
    // if (tag) filter.tags = {
    //   $in: (typeof tag === 'string') ? [tag] : tag
    // };

    // Query results as per filters
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