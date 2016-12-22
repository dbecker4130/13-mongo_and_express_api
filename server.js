'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const artistRouter = require('./route/artist-route.js');
const debug = require('debug')('artist:server');

const app = express();
const PORT = 3000;
const MONGODB_URI = 'mongodb://localhost/artist';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(cors());
app.use(morgan('dev'));
app.use(artistRouter);

app.listen(PORT, () => {
  debug(`server up: ${PORT}`);
});
