const express = require("express");
const router = express.Router();

const OrderService = require('../services/orders.service');
const orderServiceInstance = new OrderService();

router.get('/', (req, res) => {
  try {
    res.json(orderServiceInstance.getAll());
  }
  catch (err) {
    res.status(500).send({
      message: `An error occured. ${err}`,
    });
  }
});

router.get('/:id', function(req, res) {  
  try {
    res.status(200).json(orderServiceInstance.getById(parseInt(req.params.id)));
  } catch (err) {
    res.status(500).send({
      message: `An error occured. ${err}`,
    });
  }
});

router.post('/', function(req, res) {
  try {
    console.log(req.body);
    res.status(200).json(orderServiceInstance.create(req.body));
  } catch (err) {
    res.status(500).send({
      message: `An error occured. ${err}`,
    });
  }
});

module.exports = router;