'use strict';

const jwt = require('jsonwebtoken');

module.exports = function() {
  return function(req, res, next) {

    const token = req.body.token || req.query.token || req.get('Authorization')
    
    if (!token) {
      const err = new Error('No token provided');
      err.status = 401;
      next(err);
      return;
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        const err = new Error('Invalid token');
        err.status = 401;
        next(err);
        return;
      }
      req.apiUserId = payload._id;
      next();
    }); 
  };
}
