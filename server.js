'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const debug = require('debug')('artist:server');

const app = express();
const PORT = 3000;


app.listen(PORT, () => {
  debug(`server up: ${PORT}`);
});
