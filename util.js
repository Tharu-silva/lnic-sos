var neo4j = require('neo4j-driver');


//Evaluate errors in a route handler
exports.getErrors = (req) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
}

exports.findNodeById = async (id) => {
  const session = driver.session()

  const res = await session.executeRead(
    tx => tx.run(
      `
      MATCH (n) where id(n) = ${id}
      RETURN n
      `
    )
  )

  //TODO: Find a way to validate whether the node exists
}

exports.findRelationshipById = async (id) => {
  const session = driver.session()

  const res = await session.executeRead(
    tx => tx.run(
      `
      MATCH (n) -[r]-> (m) where id(r) = ${id}
      RETURN n
      `
    )
  )

  //TODO: Find a way to validate whether the node exists
}

exports.neo4jDataToD3 = (data) => {
  graph = {
    "nodes": [],
    "links": []
  }
  
  //Loop through the data object and partition nodes and relationships

  //Loop through the data object/records
  Object.keys(data).forEach(function(values) {
    //Loop through each key in record
    const currRecord = data[values]

    //Loop through each key in record
    currRecord["keys"].forEach(function(key) {
        const elem = currRecord.get(key)

      //Split the id property of the relationship from the second :
        const id = sanitizeId(elem['elementId'])
        delete elem['elementId']
        delete elem['identity']
        elem['id'] = id

        //If a node has the "type" property then add it to relationships
        if (elem.hasOwnProperty('type')) {

          //Split the id property of both the end node and start node from the second :
          const start = sanitizeId(elem['startNodeElementId'])
          const end = sanitizeId(elem['endNodeElementId'])
          
          //Sanitize
          delete elem['startNodeElementId']
          delete elem['endNodeElementId']
          elem['source'] = start
          elem['target'] = end

          //Remove the end,identity,and start properties
          delete elem['end']
          delete elem['start']

          //Add source and target properties which are copies of startNode and endNode properties
          elem['source'] = start
          elem['target'] = end

          //Add it to the graph object
          if (!graph['links'].includes(elem)) {
            graph['links'].push(elem)
          }

        } else { //Otherwise add it to the nodes property
          
          delete elem['properties']['order']  
          //Add it to the graph object
          let isExist = false
          graph['nodes'].forEach(function(foo) {
              if(foo['id'] == elem['id']) {
                isExist = true
              }
            })
          if (!isExist) {
            graph['nodes'].push(elem)
          }
          }
    })
  })
  
  // const uniqueNodes = [...new Set(graph['nodes'])]
  // delete graph['nodes']
  // graph['nodes'] = uniqueNodes
  return graph
}

sanitizeId = (id) => {
  const arr = id.split(":")
  return parseInt(arr[2])
}


exports.initDriver = () => {
  const driver = neo4j.driver('neo4j+s://553c3e44.databases.neo4j.io',
    neo4j.auth.basic(
      'neo4j', 
      'MurOG8QvcH1ZpzMK_qObnwiG7cIohuFSOjYnMXH7D1s'
    )
  )
  return driver
}
