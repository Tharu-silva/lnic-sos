const global = require('./global')

/**
 * Returns the current graph state
 * 
 * @return {Promise<nodes: [neo4j_record], relationships: [neo4j_record]>} 
 */

exports.getGraph = async () => {
  //Make a get request 
  //Return value of get request
  let urlStr = 'http://localhost:3001/graph'

  const data = await global.fetchData(urlStr, 'GET')
  return data
}

/**
 * Finds the shortest path between two existing nodes
 * @param {String} startNode 
 * @param {String} endNode 
 * @returns 
 */
exports.getShortestPath =  async (startNode, endNode) => {
  //Make a get request 
  //Return value of get request
  let urlStr = `http://localhost:3001/graph/shortestpath?start=${startNode}&end=${endNode}`

  const data = await global.fetchData(urlStr, 'GET')
  return data
}

/**
 * Gets a node given ID
 * @param {String} id ID of node
 * @returns {Promise<nodes: [neo4j_record], relationships: [neo4j_record]>}
 */
exports.getNodeById = async (id) => {
  try {
    let urlStr = `http://localhost:3001/node?id=${id}`

    const data = await global.fetchData(urlStr, "GET")
    return data
  } catch (e) {
    console.error(e)
  }
}

/**
 * Gets a set of node that contain a certain label
 * @param {String} label label of node group
 * @returns {Promise<nodes: [neo4j_record], relationships: [neo4j_record]>}
 */

exports.getNodesByLabel = async (label) => {
  try {
    let urlStr = `http://localhost:3001/node/labels?label=${label.toUpperCase()}`
    const data = await global.fetchData(urlStr, "GET")
    return data

  } catch (e) {
    console.error(e)
  }
}

/**
 * Gets a relationship by Id
 * @param {String} id ID of relationship
 * @returns {Promise<nodes: [neo4j_record], relationships: [neo4j_record]>}
 */
exports.getRelationshipById = async (id) => {
  try {
    let urlStr = `http://localhost:3001/relationship?id=${id}`

    const data = await global.fetchData(urlStr, "GET")
    return data
  } catch (e) {
    console.error(e)
  }
}


/**
 * Gets all relationships of a certain type
 * @param {String} type type of a relationship
 * @returns {Promise<nodes: [neo4j_record], relationships: [neo4j_record]>}
 */
exports.getRelationshipByType = async (type) => {
  try {
    let urlStr = `http://localhost:3001/relationship/types?type=${type.toUpperCase()}`
    const data = await global.fetchData(urlStr, "GET")
    return data

  } catch (e) {
    console.error(e)
  }
}

