
const express = require('express');
const router = new express.Router();

router.get('/', function (req, res) {
  res.status(200).send({data: []});
})

router.get('/:id', function (req, res) {
  const id = req.params.id;
  res.status(200).send({id});
})

router.post('/', function (req, res) {
  res.status(200).send({data: []});
})

const mokcFunc = function (req, res) {
  if (req.params.id !== 'A12') {
    res.status(401).send({});
  }
  else res.status(200).send({data: []});
}

router.put('/:id', function (req, res) {
  mokcFunc(req, res);
})

router.delete('/:id', function (req, res) {
  mokcFunc(req, res);
})

module.exports = router;