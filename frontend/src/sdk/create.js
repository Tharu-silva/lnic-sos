import { fetchData } from './global'
import update from './update'
import { getGraph } from './read'

/**
 * Creates a node with a required label and optional set of properties
 * 
 * @param {String} platformID of the created node
 * @return {Promise<nodes: [neo4j_record], relationships: [neo4j_record]>} 
 */
 export async function createSystemNode(platformID) {
  //Create system node
  let createStr = `http://localhost:3001/node?label=SYSTEM`
  const addedNode = await fetchData(createStr, 'POST')

  const nodeId = addedNode.nodes[0].id

  //Add connection to central node
  createRelationship("PLATFORM",{},nodeId, platformID)

  //Return graph
  const graph = await getGraph()
  return graph 
}

export async function createPlatformNode() {
  let createStr = `http://localhost:3001/node?label=PLATFORM`

  const addedNode = await fetchData(createStr, 'POST')

  //Return graph
  const graph = await getGraph()
  return graph 
}
/**
 * Creates a node with a required label and optional set of properties
 * 
 * @param {String} type type of new relationship
 * @param {Object} properties optional properties of the node
 * @param {String} start ID of start node
 * @param {String} end ID of end node
 * @return {Promise<nodes: [neo4j_record], relationships: [neo4j_record]>} 
 */
 export async function createRelationship(type, properties, start, end) {

  let urlStr = `http://localhost:3001/relationship?start=${start}&end=${end}&type=${type}`

  if (properties != {}) {
    for (const key in properties) {
      const str = `&${key}=${properties[key]}`

      urlStr += str
    }
  }

  const data = await fetchData(urlStr, 'POST')
  return data
}
