var express = require('express');
const router = require('../router');
var router = express.Router();
const create = require('../controller/createController');
const update = require('../controller/updateController');
const del = require('../controller/deleteController');
const read = require('../controller/readController')
//PREFIX = /node

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

//CREATE
//Create node with label and properties
router.post('/:label', create.node)

//PUT
//Update a node's properties
router.put('/properties/:id', update.node)

//Update a node's label
router.put('/labels/:id/:label', update.nodeLabel)

//DELETE
//Delete a node with its relationships
router.delete('/:id', del.node)
//Delete node label
router.delete('/labels/:id', del.nodeLabel)
//Delete a node's properties
router.delete('/properties/:id', del.nodeProperty)

//READ
//Read a certain node
router.get('/:id', read.node)
//Read a node label
router.get('/labels/:id', read.nodeLabel)
//Read a node's properties
router.get('/properties/:id', read.nodeproperties)