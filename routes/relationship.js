var express = require('express');
var router = express.Router();
const create = require('../controller/createController');
const update = require('../controller/updateController');
const del = require('../controller/deleteController');
const read = require('../controller/readController')


//PREFIX = /relationship
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

//CREATE
router.post('/',create.relationship)

//UPDATE
//Update the properties of a relationship
router.post('/properties/:id', update.relationship)
//Update existing relationship with certain type
router.post('/properties/type/:id/:type', update.relationshipType)

//DELETE 
//Delete a node
router.delete('/:id', del.relationship)
//Delete properties property
router.delete('/properties', del.relationshipProperty)

//GET
//Get a relationship
router.get('/:id', read.relationship)
//Get a relationship type
router.get('type/:id', read.relationshipType)
//Get the properties of a relationship
router.get('properties/:id', read.relationshipProperties)

