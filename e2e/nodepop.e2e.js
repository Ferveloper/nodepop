'use strict';

require('dotenv').config();
process.env.NODE_ENV = 'test';

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

describe('API endpoints without authentication', function () {

  describe('API Get listings endpoint', function () {
    it('should return 401 and JSON', function (done) {
      agent
        .get('/apiv1/listings')
        .expect('Content-Type', /json/)
        .expect(401, done);
    });
  });

  describe('API Get tags endpoint', function () {
    it('should return 401 and JSON', function (done) {
      agent
        .get('/apiv1/listings')
        .expect('Content-Type', /json/)
        .expect(401, done);
    });
  });

  describe('API Post listing endpoint', function () {
    it('should return 401 and JSON', function (done) {
      agent
        .post('/apiv1')
        .expect('Content-Type', /json/)
        .expect(401, done);
    });
  });
});

describe('API Get Authetication endpoint', function () {

  describe('API Get Authetication endpoint without credentials', function () {
    it('should return 401 and JSON', function (done) {
      agent
        .post('/apiv1/authenticate')
        .expect('Content-Type', /json/)
        .expect(401, done);
    });
  });

  describe('API Get Authetication endpoint with wrong email', function () {
    it('should return 401 and JSON', function (done) {
      agent
        .post('/apiv1/authenticate')
        .send({
          email: 'wrong@example.com',
          password: '1234'
        })
        .expect('Content-Type', /json/)
        .expect(401, done);
    });
  });

  describe('API Get Authetication endpoint with wrong password', function () {
    it('should return 401 and JSON', function (done) {
      agent
        .post('/apiv1/authenticate')
        .send({
          email: 'user@example.com',
          password: 'wrong'
        })
        .expect('Content-Type', /json/)
        .expect(401, done);
    });
  });

  describe('API Get Authetication endpoint with wrong email and password', function () {
    it('should return 401 and JSON', function (done) {
      agent
        .post('/apiv1/authenticate')
        .send({
          email: 'wrong@example.com',
          password: 'wrong'
        })
        .expect('Content-Type', /json/)
        .expect(401, done);
    });
  });

  describe('API Get Authetication endpoint with right credentials', function () {
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

})


describe('API endpoints with authentication', function () {

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

  describe('API Get listings endpoint', function () {
    it('should return 200 and JSON', function (done) {
      agent
        .get('/apiv1/listings')
        .set('Authorization', `${token}`)
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('API Get tags endpoint', function () {
    it('should return 200 and JSON', function (done) {
      agent
        .get('/apiv1/listings')
        .set('Authorization', `${token}`)
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('API Post listing endpoint', function () {
    it('should return 200 and JSON', function (done) {
      agent
        .post('/apiv1')
        .set('Authorization', `${token}`)
        .attach('photo', './e2e/test.jpg')
        .field({ name: 'Test listing' })
        .field({ sale: true })
        .field({ price: 1 })
        .field({ tag: ['mobile', 'motor', 'lifestyle', 'work'] })
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) throw err;
          Listing.deleteOne({ _id: res.body.result._id }, function (err) {
            if (err) throw err;
            console.log('Test listing deleted from database')
          });
          rimraf(`./public/images/${res.body.result.photo}`, function () { console.log('Uploaded test image deleted from images folder'); });
          done();
        });
    });

  });

});
