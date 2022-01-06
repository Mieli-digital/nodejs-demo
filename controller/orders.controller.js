const express = require('express');
const router = express.Router();

const ordersService = require('../services/orders.service');
const ordersServiceInstance = new ordersService();


router.get('/', function(req, res) {
  res.status(200).json(ordersServiceInstance.getAll());
});

router.get('/:id', function(req, res) {
  res.status(200).json(ordersServiceInstance.getById(parseInt(req.params.id)));
});

router.post('/', function(req, res) {
  res.status(200).json(ordersServiceInstance.create(req.body));
});

router.put('/:id', function(req, res) {
  res.status(200).json(ordersServiceInstance.update(parseInt(req.params.id), req.body));
});

router.delete('/:id', function(req, res) {
  res.status(200).json(ordersServiceInstance.delete(parseInt(req.params.id)));
});

module.exports = router;