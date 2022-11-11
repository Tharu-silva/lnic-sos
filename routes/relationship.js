var express = require('express');
var router = express.Router();
//PREFIX = /relationship
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

//CREATE
router.post('/')

//UPDATE
//Update the properties of a relationship
router.post('/properties/:id')
//Update existing relationship with certain type
router.post('/properties/type/:id/:type')

//DELETE 
//Delete a node
router.delete('/:id')
//Delete properties property
router.delete('/properties')

//GET
//Get a relationship
router.get('/:id')
//Get a relationship type
router.get('type/:id')
//Get the properties of a relationship
router.get('properties/:id')

