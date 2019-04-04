'use strict';

require('dotenv').config();

const request = require('supertest');

const app = require('../routes/apiv1/listings');

describe('APIv1 Listings', function(done) {
  it('should return 200', function() {
    request(app)
      .get('/listings')
      .expect(200, done);
  });
});

describe('APIv1 Tags', function(done) {
  it('should return 200', function() {
    request(app)
      .get('/tags')
      .expect(200, done);
  });
});