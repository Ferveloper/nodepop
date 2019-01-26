'use strict';

const express = require('express');
const router = express.Router();
const Listing = require('../../models/Listing');
const applyFilters = require('../../lib/applyFilters');

/* GET home page. */
router.get('/listings', async (req, res, next) => {
  try {
    // Input values
    const name = req.query.name;
    const forSale = req.query.sale;
    const price = req.query.price;
    const tags = req.query.tag;

    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const fields = req.query.fields;
    const sort = req.query.sort;

    const filter = applyFilters(name, forSale, price, tags);

    // Query results as per filters
    const listings = await Listing.list(filter, skip, limit, fields, sort);

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
    const data = {};
    data.name = req.body.name;
    data.forSale = req.body.sale;
    data.price = req.body.price;
    data.photo = req.body.photo;
    data.tags = req.body.tag;

    const listing = new Listing(data);
    const savedListing = await listing.save();

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
    const tags = await Listing.distinct('tags');
    res.json({
      success: true,
      results: {
        tags: tags
      }
    });

  } catch (err) {
    next(err);
    return;
  }
});

router.use(function (err, req, res, next) {
  // Send the error JSON
  res.status(err.status || 500);
  res.json({
    success: false,
    status: err.status || 500,
    message: err.message
  });
});

module.exports = router;