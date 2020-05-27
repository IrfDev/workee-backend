require('dotenv').config();
const cors = require('cors');

const express = require('express');

const app = express();

require('./Lib/router')(app);

app.use(cors);

module.exports = app;