const util = require('../util')
const { validationResult } = require('express-validator')

//Read node
exports.node = async (req,res,next) => {
  let driver = util.initDriver();

  //Create session
  try {
    const session = driver.session()

    const result = await session.executeRead(
      tx => tx.run(
        `
        MATCH (n) 
        WHERE id(n) = ${req.query.id}
        RETURN n
        `
      )
    )
    
    await session.close()
    await driver.close()

    res.json(util.neo4jDataToD3(result.records))

  } catch (error) {
    console.error(error)
  }
}

//Get all node of a certain label
exports.nodeLabel = async (req,res,next) => {
  let driver = util.initDriver();

  //Create session
  try {
    const session = driver.session()

    const result = await session.executeRead(
      tx => tx.run(
        `
        MATCH (n: ${req.query.label}) 
        RETURN n
        `
      )
    )
    
    await session.close()
    await driver.close()

    res.json(util.neo4jDataToD3(result.records))

  } catch (error) {
    console.error(error)
  }
}

//Read relationship
exports.relationship = async (req,res,next) => {
  let driver = util.initDriver();

  //Create session
  try {
    const session = driver.session()

    const result = await session.executeRead(
      tx => tx.run(
        `
        MATCH (n) -[r]-> (m) 
        WHERE id(r) = ${req.query.id}
        RETURN r
        `
      )
    )
    
    await session.close()
    await driver.close()

    res.json(util.neo4jDataToD3(result.records))

  } catch (error) {
    console.error(error)
  }

}

//Read relationship type
exports.relationshipType = async (req,res,next) => {
  let driver = util.initDriver();

  //Create session
  try {
    const session = driver.session()

    const result = await session.executeRead(
      tx => tx.run(
        `
        MATCH (n) -[r:${req.query.type}]-> (m)
        RETURN r
        `
      )
    )
    
    await session.close()
    await driver.close()

    res.json(util.neo4jDataToD3(result.records))

  } catch (error) {
    console.error(error)
  }
}
