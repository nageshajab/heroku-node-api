'use strict'

// imports
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const middleware = require('./middleware');

// initialize express app
const app = module.exports = express();

// define middlewares
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
//app.use(middleware.myLogger); will involve middleware for all endpoints

// read environment variables
dotenv.config();

// define routes for routes
require('./routes')(app);

//start listening on port
let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT}`);
});