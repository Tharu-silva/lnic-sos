var express = require('express');
const router = require('../router');
var router = express.Router();
//PREFIX = /node
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

//CREATE
//Create node with label and relationships
router.post('/:label')

//PUT
//Update a node's properties
router.put('/properties/:id')

//Update a node's label
router.put('/labels/:id/:label')

//DELETE
//Delete a node with its relationships
router.delete('/:id')
//Delete a node's properties
router.delete('/properties/:id')

//READ
//Read a certain node
router.get('/:id')
//Read a node label
router.get('/labels/:id')
//Read a node's properties
router.get('/properties/:id')