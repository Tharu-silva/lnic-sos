var express = require('express');
var router = express.Router();

const create = require('../controllers/createController');
const update = require('../controllers/updateController');
const del = require('../controllers/deleteController');
const read = require('../controllers/readController');
const {body} = require('express-validator');
const util = require('../util')

//PREFIX = /node
//Create node with label and properties
router.get('/',create.node)


//Update a node's properties
router.put('/properties', update.node)
router.put('/labels', update.nodeLabel)


//Delete a node with its relationships
router.delete('/', del.node)
//Delete node label
router.delete('/labels', del.nodeLabel)
//Delete a node's properties
router.delete('/properties', del.nodeProperty)

//Read a certain node
router.get('/', read.node)

//Read a node label
router.get('/labels', read.nodeLabel)

module.exports = router;