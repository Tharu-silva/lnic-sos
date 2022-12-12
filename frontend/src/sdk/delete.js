const global = require('./global')

/**
 * Deletes a node specified by id
 * 
 * @param {String} id 
 * @returns {Promise<nodes: [neo4j_record], relationships: [neo4j_record]>}
 */

exports.deleteSystemNode = async (id) => {
  let urlStr = `http://localhost:3001/node?id=${id}`

  const data = await global.fetchData(urlStr, 'DELETE')
  return data
}

/**
 * Deletes a property by node
 * @param {String} id 
 * @param {Object} properties 
 * @returns {Promise<nodes: [neo4j_record], relationships: [neo4j_record]>}
 */
 exports.deleteNodeProps = async (id, properties) => {
  try {
    let urlStr = `http://localhost:3001/node/properties?id=${id}`

    for (const key in properties) {
      const str = `&${key}=${properties[key]}`
  
      urlStr += str
    }

    const data = await global.fetchData(urlStr, "DELETE")
    return data
  } catch (e) {
    console.error(e)
  }
}

/**
 * Deletes a group of nodes if they contain specified property/s
 * @param {Object} properties 
 * @returns {Promise<nodes: [neo4j_record], relationships: [neo4j_record]>}
 */
exports.deleteNodesByProps = async (properties) => {
  try {
    let urlStr = `http://localhost:3001/node/properties?`

    for (const key in properties) {
      const str = `${key}=${properties[key]}&`
  
      urlStr += str
    }
    urlStr = urlStr.slice(0, -1);
    const data = await global.fetchData(urlStr, "DELETE")
    return data
  } catch (e) {
    console.error(e)
  }
}

/**
 * Deletes a label by node
 * @param {String} id 
 * @param {String} label 
 * @returns {Promise<nodes: [neo4j_record], relationships: [neo4j_record]>}
 */
exports.deleteLabelByNode = async (id,label) => {
  try {
    let urlStr = `http://localhost:3001/node/labels?id=${id}&label=${label}`

    const data = await global.fetchData(urlStr, "DELETE")
    return data
  } catch (e) {
    console.error(e)
  }
}

/**
 * Deletes nodes by a label
 * @param {String} label 
 * @returns {Promise<nodes: [neo4j_record], relationships: [neo4j_record]>}
 */
exports.deleteNodesByLabel = async (label) => {
  try {
    let urlStr = `http://localhost:3001/node/labels?label=${label}`
    
    const data = await global.fetchData(urlStr, "DELETE")
    return data
  } catch (e) {
    return console.error(e)
  }
}

/**
 * Deletes a relationship by id
 * @param {String} id 
 * @returns {Promise<nodes: [neo4j_record], relationships: [neo4j_record]>}
 */
exports.deleteRel = async (id) => {
  let urlStr = `http://localhost:3001/relationship?id=${id}`

  const data = await global.fetchData(urlStr, 'DELETE')
  return data
}

/**
 * Deletes props by relationship ID
 * @param {String} id 
 * @param {Object} properties 
 * @returns {Promise<nodes: [neo4j_record], relationships: [neo4j_record]>}
 */
exports.deleteRelProps = async (id, properties) => {
  try {
    let urlStr = `http://localhost:3001/relationship/properties?id=${id}`

    for (const key in properties) {
      const str = `&${key}=${properties[key]}`
  
      urlStr += str
    }
    const data = await global.fetchData(urlStr, "DELETE")
    return data
  } catch (e) {
    console.error(e)
  }
}

/**
 * Deletes a group of relationships if they contain specified property/s
 * @param {Object} properties 
 * @returns {Promise<nodes: [neo4j_record], relationships: [neo4j_record]>}
 */
exports.deleteRelsByProps = async (properties) => {
  try {
    let urlStr = `http://localhost:3001/relationship/properties?`

    for (const key in properties) {
      const str = `${key}=${properties[key]}&`
  
      urlStr += str
    }
    urlStr = urlStr.slice(0, -1);
    console.log(urlStr)

    const data = await global.fetchData(urlStr, "DELETE")
    return data
  } catch (e) {
    console.error(e)
  }
}

/**
 * Deletes a group of relationships by type
 * @param {String} type 
 * @returns {Promise<nodes: [neo4j_record], relationships: [neo4j_record]>}
 */
exports.deleteRelsByType = async (type) => {
  try {
    let urlStr = `http://localhost:3001/relationship/types?type=${type}`
    
    const data = await global.fetchData(urlStr, "DELETE")
    return data
  } catch (e) {
    return console.error(e)
  }
}
