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
    if (req.body.name !== undefined) {
      data.name = req.body.name
    } else {
      throw {
        status: 422,
        message: "name parameter is required"
      }
    };
    if (req.body.sale !== undefined) {
      data.forSale = req.body.sale
    } else {
      throw {
        status: 422,
        message: "sale parameter is required"
      }
    };
    if (req.body.price !== undefined) {
      data.price = req.body.price
    } else {
      throw {
        status: 422,
        message: "price parameter is required"
      }
    };
    if (req.body.photo !== undefined) {
      data.photo = req.body.photo
    } else {
      throw {
        status: 422,
        message: "photo parameter is required"
      }
    };
    if (req.body.tag !== undefined && !req.body.tag.includes("")) {
      data.tags = req.body.tag
    } else {
      throw {
        status: 422,
        message: "tag parameter is required"
      }
    };

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

module.exports = router;