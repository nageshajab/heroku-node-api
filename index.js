'use strict'

// imports
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const usercontroller=require('./controllers/usercontroller'); 
const watchlistController=require('./controllers/watchListController');

// initialize express app
const app = module.exports = express();

// define middlewares
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// read environment variables
dotenv.config();

// define routes for routes
app.post("/user/generateToken",usercontroller.generateToken);
app.post("/user/validateToken",usercontroller.validateToken);

//define routes for watchList
app.post('/watchlist/list',watchlistController.list);

//start listening on port
let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT}`);
});