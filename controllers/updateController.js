const util = require('../util')
const {transformProps} = require('./createController')
const { validationResult } = require('express-validator')

//Update property
exports.node = async (req,res,next) => {
  //Evaluate errors
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {//Create session
    const driver = util.initDriver() 
    const session = driver.session()

    const id = req.query.id

    delete req.query.id

    const properties = transformProps(req.query)
    
    const query =  
    `
    MATCH (n)
    WHERE id(n) = ${id}
    SET n += ${properties}
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


//Update node label
exports.nodeLabel = async (req,res,next) => {
  //Evaluate errors
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {//Create session
    const driver = util.initDriver() 
    const session = driver.session()

    const id = req.query.id

    const label = req.query.label
    
    const query = `
    MATCH (n) 
    WHERE Id(n) = ${id}
    SET n:${label}
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


//Update relationship properties
exports.relationship = async (req,res,next) => {
  //Evaluate errors
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {//Create session
    const driver = util.initDriver() 
    const session = driver.session()

    const id = req.query.id

    delete req.query.id

    const properties = transformProps(req.query)
    
    const query =  
    `
    MATCH (n) -[r]-> (m)
    WHERE id(r) = ${id}
    SET r += ${properties}
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


//Update relationship label
exports.relationshipType = async (req,res,next) => {
  //Evaluate errors
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {//Create session
    const driver = util.initDriver() 
    const session = driver.session()

    const id = req.query.id

    const type = req.query.type
    
    const query = `
    MATCH (f)-[rel]->(b)
    WHERE id(rel) = ${id}
    CALL apoc.refactor.setType(rel, '${type}')
    YIELD input, output
    RETURN input, output
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

