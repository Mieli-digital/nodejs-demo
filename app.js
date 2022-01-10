const express = require('express');
const fs = require('fs');
const path = require('path');
var fileupload = require("express-fileupload");

//set path
global.__basedir = __dirname;

const orderController = require('./controller/orders.controller')
const initFilesRoutes = require('./routes/files.routes');

const app = express();
app.use(fileupload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) =>{
  console.log("Standard Logger");
  next();
});

let myCustomLogger = (req, res, next) => {
  console.log("Custom Logger");
  next();
};

app.get('/', myCustomLogger, function(req, res){  
  console.log("Hey GET Function");
  if(!req.query.id)
    res.status(200).send('Hello there! This is a GET Request.');
  else{
    console.log(req.query);
    res.status(200).send(`Query id is ${req.query.id}`)
  }    
});

app.post('/', (req, res) => {
  res.status(200).send('Hello, this is a POST request.');
});

app.put('/', function(req, res){  
  res.status(200).send('Hello there! This is a PUT Request.');
});

app.delete('/', (req, res) => {
  res.status(200).send('Hello, this is a DELETE request.');
});

app.all('/', (req, res) => {
  res.status(400).send('Böse! Hab ich nicht implementiert!');
});

app.use('/orders', orderController);

initFilesRoutes(app);

app.listen(3000, () => {
  console.log("Running on Port 3000");
});