'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Artist = require('../model/artist.js');
const PORT = 3000;

process.env.MONGODB_URI = 'mongodb://localhost/artisttest';

require('../server.js');

const url = `http://localhost:${PORT}`;
const exampleArtist = {
  name: 'test artist name',
  genre: 'test artist genre'
};

describe('Artist Routes', function() {
  describe('POST: /api/artist', function() {
    describe('with a valid body', function() {
      after( done => {
        if (this.tempArtist) {
          Artist.remove({})
          .then(() => done())
          .catch(done);
          return;
        }
        done();
      });
      it('should return an artist', done => {
        request.post(`${url}/api/artist`)
        .send(exampleArtist)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('test artist name');
          this.tempArtist = res.body;
          done();
        });
      });
    });
  });

  describe('GET: /api/artist/:id', function() {
    describe('with a valid body', function() {
      before( done => {
        exampleArtist.timestamp = new Date();
        new Artist(exampleArtist).save()
        .then( artist => {
          this.tempArtist = artist;
          done();
        })
        .catch(done);
      });
      after( done => {
        delete exampleArtist.timestamp;
        if(this.tempArtist) {
          Artist.remove({})
          .then(() => done())
          .catch(done);
          return;
        }
        done();
      });
      it('should return an artist', done => {
        request.get(`${url}/api/artist/${this.tempArtist._id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('test artist name');
          done();
        });
      });
    });
  });
});
