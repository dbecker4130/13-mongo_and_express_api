'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistSchema = Schema({
  name: { type: String, required: true},
  genre: { type: String, requied: true},
  timestamp: { type: Date, requied: true}
});

module.exports = mongoose.model('artist', artistSchema);
