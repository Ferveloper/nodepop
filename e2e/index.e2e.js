'use strict';

require('dotenv').config();

const request = require('supertest');

const app = require('../routes/index');

describe('Index', function(done) {
  it('should return 200', function() {
    request(app)
      .get('/')
      .expect(200, done);
  });
});
