var express = require('express');
const { uniq } = require('lodash');
var router = express.Router();
const util = require('../util');
var neo4j = require('neo4j-driver');
var graph = require('../controllers/graphController')


router.get('/', graph.getGraph)

router.get('/shortestpath', graph.getShortestPath)

router.get('/stats/platformNo')

//Algorithm routes

module.exports = router;