var express = require('express');
var router = express.Router();
const create = require('../controllers/createController');
const update = require('../controllers/updateController');
const del = require('../controllers/deleteController');
const read = require('../controllers/readController')
const {body} = require('express-validator');
const util = require('../util')


//PREFIX = /relationship
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

//CREATE
router.post('/',
body('start').isNumeric().custom(value => {
  util.findNodeById(value).catch((error) => {
    Promise.reject('Start node does not exist')
  })
}), 
body('end').isNumeric().custom(value => {
  util.findNodeById(value).catch((error) => {
    Promise.reject('End node does not exist')
  })
}), 
body('type').notEmpty(),
create.relationship)

//PUT
//Update the property of a relationship
router.post('/properties',
body('id').isNumeric().custom(value => {
  util.findRelationshipById(value).catch((error) => {
    Promise.reject('Relationship does not exist')
  })
}),
update.relationship)


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

