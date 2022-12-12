const global = require('./global')

/**
 * Updates the properties of a node
 * @param {String} id of the node
 * @param {Object} properties in the form of an object
 * @returns {Promise<nodes: [neo4j_record], relationships: [neo4j_record]>}
 */
exports.updateNodeProperties = async (id, properties) => {
  try {
    let urlStr = `http://localhost:3001/node/properties?id=${id}`

    for (const key in properties) {
      const str = `&${key}=${properties[key]}`

      urlStr += str
    }
    
    const data = await global.fetchData(urlStr, "PUT")
    return data
  } catch (e) {
    console.error(e)
  }
}


/**
 * Adds a label to a node
 * @param {String} id of the node
 * @param {String} label to be added to node
 * @returns {Promise<nodes: [neo4j_record], relationships: [neo4j_record]>}
 */

exports.addNodeLabel = async (id, label) => {
  try {
    let urlStr = `http://localhost:3001/node/labels?id=${id}&label=${label}`

    const data = await global.fetchData(urlStr, "PUT")
    return data
  } catch (e) {
    console.error(e)
  }
}

/**
 * Updates the properties of a relationship
 * @param {String} id 
 * @param {Object} properties 
 * @returns {Promise<nodes: [neo4j_record], relationships: [neo4j_record]>}
 */
 exports.updateRelProperties = async (id, properties) => {
  try {
    let urlStr = `http://localhost:3000/relationship/properties?id=${id}`

    for (const key in properties) {
      const str = `&${key}=${properties[key]}`
  
      urlStr += str
    }
    
    const data = await global.fetchData(urlStr, "PUT")
    return data
  } catch (e) {
    console.error(e)
  }
}

/**
 * Changes the type of a relationship
 * @param {String} id 
 * @param {String} type 
 * @returns {Promise<nodes: [neo4j_record], relationships: [neo4j_record]>}
 */
exports.addRelType = async (id, type) => {
  try {
    let urlStr = `http://localhost:3000/relationship/types?id=${id}&type=${type}`

    const data = await global.fetchData(urlStr, "PUT")
    return data
  } catch (e) {
    console.error(e)
  }
}