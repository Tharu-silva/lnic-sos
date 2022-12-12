var express = require('express');
var router = express.Router();

const create = require('../controllers/createController');
const update = require('../controllers/updateController');
const del = require('../controllers/deleteController');
const read = require('../controllers/readController');
const {body} = require('express-validator');
const util = require('../util');


//Create a relationship
router.post('/', create.relationship);



//Update the property of a relationship
router.put('/properties',update.relationship)
router.put('/types', update.relationshipType)


//Delete a relationship
router.delete('/', del.relationship)
//Delete properties property
router.delete('/properties', del.relationshipProperty)
//Delete relationhips by type
router.delete('/types', del.relationshipType)


//Get a relationship
router.get('/', read.relationship)
//Get a relationship type
router.get('/types', read.relationshipType)

module.exports = router;