'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Artist = require('../model/artist.js');
const debug = require('debug')('artist:artist-router');
const artistRouter = module.exports = new Router();

artistRouter.post('/api/artist', jsonParser, function(req, res, next) {
  debug('POST: /api/artist');

  req.body.timestamp= new Date();
  new Artist(req.body).save()
  .then( artist => res.json(artist))
  .catch(next);
});

artistRouter.get('/api/artist/:id', function(req, res, next) {
  debug('GET: /api/artist/:id');

  Artist.findById(req.params.id)
  .then( artist => res.json(artist))
  .catch(next);
});
