'use strict';

require('dotenv').config();

const request = require('supertest');

const app = require('../app');
const agent = request.agent(app);
const Listing = require('../models/Listing');
const rimraf = require('rimraf');

describe('Home webpage', function () {
  it('should return 200 and HTML', function (done) {
    agent
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
});


describe('Unauthenticated API Listings endpoint', function () {
  it('should return 401 and JSON', function (done) {
    agent
      .get('/apiv1/listings')
      .expect('Content-Type', /json/)
      .expect(401, done);
  });
});

describe('Unauthenticated API Tags endpoint', function () {
  it('should return 401 and JSON', function (done) {
    agent
      .get('/apiv1/listings')
      .expect('Content-Type', /json/)
      .expect(401, done);
  });
});

describe('Unauthenticated API Create listing endpoint', function () {
  it('should return 401 and JSON', function (done) {
    agent
      .post('/apiv1')
      .expect('Content-Type', /json/)
      .expect(401, done);
  });
});

describe('API Get authentication endpoint', function () {
  it('should return 200 and JSON', function (done) {
    agent
      .post('/apiv1/authenticate')
      .send({
        email: 'user@example.com',
        password: '1234'
      })
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('API Authenticated endpoints', function () {

  var token;

  before(function (done) {
    agent
      .post('/apiv1/authenticate')
      .send({
        email: 'user@example.com',
        password: '1234'
      })
      .end(function (err, res) {
        if (err) throw err;
        token = res.body.token
        done();
      });
  });

  describe('API Listings endpoint', function () {
    it('should return 200 and JSON', function (done) {
      agent
        .get('/apiv1/listings')
        .set('Authorization', `${token}`)
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('API Tags endpoint', function () {
    it('should return 200 and JSON', function (done) {
      agent
        .get('/apiv1/listings')
        .set('Authorization', `${token}`)
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('API Create listing endpoint', function () {
    it('should return 200 and JSON', function (done) {
      agent
        .post('/apiv1')
        .set('Authorization', `${token}`)
        .attach('photo', './e2e/test.jpg')
        .field({name: 'Test listing'})
        .field({sale: true})
        .field({price: 1})
        .field({tag: ['mobile', 'motor', 'lifestyle', 'work']})
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) throw err;
          Listing.deleteOne({_id : res.body.result._id}, function (err) {
            if (err) return handleError(err);
            console.log('Database entry deleted')
          });
          rimraf(`./public/images/${res.body.result.photo}`, function () { console.log('Uploaded image deleted'); });
          done();
        });
    });

  });

});
