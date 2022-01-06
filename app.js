const express = require('express');
const logger = require('morgan');
const fs = require('fs');
const path = require('path');

const ordersController = require('./controller/orders.controller');
const initIndexRoutes = require('./routes/index.routes');

//set path
global.__basedir = __dirname;

const app = express();

app.use(logger('dev'));
var accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'), {flags: 'a'}
);
// setup the logger 
app.use(logger('combined', {stream: accessLogStream}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json())


// GET method route
app.get('/', function (req, res) {
  res.send('GET request to the homepage');
});

// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage');
});

// PUT method route
app.put('/', function (req, res) {
  res.send('PUT request to the homepage');
});

// DELETE method route
app.delete('/', function (req, res) {
  res.send('DELETE request to the homepage');
});

app.all('/', function(req, res){
  res.send("Another request to the homepage");
});

app.use('/orders', ordersController);

initIndexRoutes(app);

app.listen(3000, () => {
  console.log("Running on Port 3000")
})
