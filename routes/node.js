var express = require('express');
const router = require('../router');
var router = express.Router();
const create = require('../controllers/createController');
const update = require('../controllers/updateController');
const del = require('../controllers/deleteController');
const read = require('../controllers/readController');
const {body} = requie('express-validator');
const util = require('../util')

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
router.put('/properties',
body("id").isNumeric().custom(value => {
  util.findNodeById(value).catch((error) => {
    Promise.reject('Node does not exist')
  })
}),
update.node)

//Update a node's label
router.put('/labels',
body("id").isNumeric().custom(value => {
  util.findNodeById(value).catch((error) => {
    Promise.reject('Node does not exist')
  })
}),  
update.nodeLabel)

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