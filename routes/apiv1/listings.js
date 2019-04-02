'use strict';

const express = require('express');
const router = express.Router();
const Listing = require('../../models/Listing');
const User = require('../../models/User');
const jwtAuth = require('../../lib/jwtAuth');
const applyFilters = require('../../lib/applyFilters');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer  = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    let dotIndex = file.originalname.lastIndexOf('.');
    let name = file.originalname.substring(0, dotIndex);
    let ext = file.originalname.substring(dotIndex, file.originalname.length);
    cb(null, `${name}-${Date.now()}${ext}`)
  }
});
const upload = multer({
  storage: storage
});
const createThumbnail = require('../../lib/thumbnailClient')

// JWT authentication
router.post('/authenticate', async (req, res, next) => {
  try {
    // get login parameters from body
    const email = req.body.email;
    const password = req.body.password;

    // search user in database
    const user = await User.findOne({ email: email });

    // error response if user or password don't match
    if (!user || !await bcrypt.compare(password, user.password)) {
      res.json({ success: false, error: res.__('Invalid credentials') });
      return;
    }

    // create JWT
    const token = await new Promise((resolve, reject) => {
      jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '2d'
      }, (err, token) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(token);
      });
    });

    res.json({ success: true, token: token });
    
  } catch (err) {
    next(err);
  }
})

// Get listings
router.get('/listings', jwtAuth(), async (req, res, next) => {
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
router.post('/', jwtAuth(), upload.single('photo'), async (req, res, next) => {
  try {
    const data = {};
    console.log("TCL: req.file", req.file)
    console.log("TCL: req.body", req.body)
    if (req.body.name) {
      data.name = req.body.name
    } else {
      throw {
        status: 422,
        message: "name parameter is required"
      }
    };
    if (req.body.sale) {
      data.forSale = req.body.sale
    } else {
      throw {
        status: 422,
        message: "sale parameter is required"
      }
    };
    if (req.body.price) {
      data.price = req.body.price
    } else {
      throw {
        status: 422,
        message: "price parameter is required"
      }
    };
    if (req.file) {
      data.photo = req.file.filename;
      createThumbnail(100, 100, req.file.destination, req.file.filename)
    } else {
      throw {
        status: 422,
        message: "photo parameter is required"
      }
    };
    if (req.body.tag && (typeof req.body.tag == 'string' || (Array.isArray(req.body.tag) && !req.body.tag.includes('')))) {
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
router.get('/tags', jwtAuth(), async (req, res, next) => {
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
