var express = require('express');
const router = require('../router');
var router = express.Router();
const create = require('../controller/createController');
const update = require('../controller/updateController');
const del = require('../controller/deleteController');
const read = require('../controller/readController');
const {body} = requie('express-validator');
//PREFIX = /node

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

//CREATE
//Create node with label and properties

router.post('/', body('label').custom(value =>{
  if (value == null) {return Promise.reject("Every node must be created with a label")}
}),
create.node)

//PUT
//Update a node's properties
router.put('/properties/:id', update.node)

//Update a node's label
router.put('/labels/:id', update.nodeLabel)

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