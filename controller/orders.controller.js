const express = require('express');
const router = express.Router();

const ordersService = require('../services/orders.service');
const ordersServiceInstance = new ordersService();


router.get('/', function(req, res) {
  try {
    res.status(200).json(ordersServiceInstance.getAll());
  } catch (err) {
    res.status(500).send({
      message: `An error occured. ${err}`,
    });
  }
});

router.get('/:id', function(req, res) {  
  try {
    res.status(200).json(ordersServiceInstance.getById(parseInt(req.params.id)));
  } catch (err) {
    res.status(500).send({
      message: `An error occured. ${err}`,
    });
  }
});

router.post('/', function(req, res) {
  try {
    res.status(200).json(ordersServiceInstance.create(req.body));
  } catch (err) {
    res.status(500).send({
      message: `An error occured. ${err}`,
    });
  }
});

router.put('/:id', function(req, res) {
  try {
    res.status(200).json(ordersServiceInstance.update(parseInt(req.params.id), req.body));
  } catch (err) {
    res.status(500).send({
      message: `An error occured. ${err}`,
    });
  }  
});

router.delete('/:id', function(req, res) {
  try {
    res.status(200).json(ordersServiceInstance.delete(parseInt(req.params.id)));
  } catch (err) {
    res.status(500).send({
      message: `An error occured. ${err}`,
    });
  }  
});


module.exports = router;