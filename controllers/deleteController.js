const nodeRoute = require('../routes/node')
const relationshipRoute = require('../routes/relationship')

//Delete node and corresponding relationship
exports.node = (req,res,next) => {
  //Delete node and relationships: Auto checking for node prescence
  //Return a list of node and relationsips
}
//Delete a node's properties
exports.nodeProperty = (req,res,next) => {
  //Loop through properties and set them to null
  //Return the properties deleted
}

//Delete a node's label
exports.nodeLabel = (req,res,next) => {
  //
}

//Delete a node's property
exports.relationship = (req,res,next) => {

}

//Delete a relationship's properties
exports.relationshipProperty = (req,res,next) => {

}
