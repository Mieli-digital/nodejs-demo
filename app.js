const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const ordersController = require('./controller/ordersController');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json())

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

app.listen(3000, () => {
  console.log("Running on Port 3000")
})
