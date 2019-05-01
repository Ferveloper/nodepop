'use strict';

require('dotenv').config();

const request = require('supertest');

const app = require('../app');
const agent = request.agent(app)

describe('Index', function() {
  it('should return 200', function(done) {
    agent
      .get('/')
      .expect(200, done);
  });
});

describe('Fake', function() {
  it('should return 404', function(done) {
    agent
      .get('/lkfasñlfksaf')
      .expect(404, done);
  });
});
