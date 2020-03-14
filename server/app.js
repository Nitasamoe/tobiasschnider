// Require NPM
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Require API Routes
const articleRoutes = require('./routes/article');

// Configs
dotenv.config();
const app = express();

// Set Up Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(
  process.env.DATABASE,
  {useNewUrlParser:true, useUnifiedTopology:true},
  (err) => {
      if(err) {
        console.log("-------------- Connection to MongoDB Failed ------------");
        console.log(err);
      } else {
        console.log("-------------- Connection to MongoDB Successfull ------------");
      }
  }

);


// Set Up API Routes
app.use('/api', articleRoutes);


// Set Up Listen
app.listen(3000, (err)=>{
    if(err) {
        console.log(err);
    } else {
        console.log("-------------- App listening on Port 3000 ------------")
    }
})