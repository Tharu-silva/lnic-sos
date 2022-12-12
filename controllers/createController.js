const util = require('../util')
const { validationResult } = require('express-validator')
// const { driver } = require('neo4j-driver-core')

//Create node with label and properties
exports.node = async (req,res,next) => {

  try {//Create session
    const driver = util.initDriver() 
    const session = driver.session()

    //Transform params to required format
    const label = req.query.label

    delete req.query.label;
    let properties = '';
    if (!req.query) {
      properties = transformProps(req.query)
    }

    //Add the node to database
    const query =  
    `
    CREATE (k:${label} ${properties})
    RETURN k
    `

    const write = await session.executeWrite(
      tx => tx.run(
        query
      )
    )
    
    await session.close()
    await driver.close()
    res.json(util.neo4jDataToD3(write.records))
  } catch (e) {
    console.error(e)
  }
}

exports.transformProps = (obj) => {
  const str = JSON.stringify(obj)
  const split = str.split("\"")
  let final = ""

  for (i = 0; i < split.length; i++) {
    if (split[i] == ':') {
      final += ":\""
    } else if (split[i] == ",") {
      final += "\","
    } else if (i == split.length - 1) {
      //Look at the curr val of i. If int then add ":i}"" 
      if (parseInt(split[i].charAt(1))) {
        final += split[i]
      } else {
        final += "\"}"
      }
    } 
    else {
      final += split[i]
    }
  }

  return final
}

//Create a relationship between two existing nodes
exports.relationship = async (req,res,next) => {
  //Evaluate errors
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {//Create session
    const driver = util.initDriver() 
    const session = driver.session()

    const type = req.query.type
    const start = req.query.start
    const end = req.query.end

    delete req.query.type
    delete req.query.start
    delete req.query.end 
    
    let properties = '';
    if (!req.query) {
      properties = transformProps(req.query)
    }    
    const query =  
    `
    MATCH (n1),(n2)
    WHERE id(n1) = ${start} AND id(n2) = ${end}
    MERGE (n1) -[r:${type} ${properties}]-> (n2)
    return r
    `

    const result = await session.executeWrite(
      tx => tx.run(query)
    )
    
    const allRel = await session.executeRead(
      tx => tx.run(
        `
        MATCH (n) -[r]-> (m)
        RETURN n,r,m
        `
      )
    )
  
    await session.close()
    await driver.close()

    res.json(util.neo4jDataToD3(allRel.records))
  } catch (e) {
    console.error(e)
  }
}

