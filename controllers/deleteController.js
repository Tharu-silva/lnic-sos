const { resolveSoa } = require('dns');
const { validationResult } = require('express-validator')
const util = require('../util')
const {transformProps} = require('./createController')


//Delete node and corresponding relationship
exports.node = async (req,res,next) => {
   //Evaluate errors
   const errors = validationResult(req);
   if(!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }

   try {//Create session
      const driver = util.initDriver() 
      const session = driver.session()

      //Delete all system connections on the node
      const query1 = 
      `
      MATCH (n) <-[s:PLATFORM]- (k)
      WHERE id(n) = ${req.query.id}
      DELETE k,s
      RETURN k,s
      `

      //Delete the node
      const query2 =  
      `
      MATCH (n)
      WHERE id(n) = ${req.query.id}
      DETACH DELETE n
      RETURN n 
      `
      const write2 = await session.executeWrite(
        tx => tx.run(
          query2
        )
      )

      const write1 = await session.executeWrite(
        tx => tx.run(
          query1
        )
      )

      const result = await session.executeRead(
        tx => tx.run(
          `
          MATCH (n) -[r]-> (m)
          RETURN n,r,m
          `
        )
      )

      await session.close()
      await driver.close()

      res.json(util.neo4jDataToD3(result.records))

   } catch (e) {
     console.error(e)
   }
}


//Delete a node's properties
exports.nodeProperty = async (req,res,next) => {
  //Evaluate errors
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {//Create session
    const driver = util.initDriver() 
    const session = driver.session()

    let query
    if (req.query.id) {
      const id = req.query.id
      delete req.query.id
      query = `
      MATCH (n)
      WHERE id(n) = ${id}
      `
      //Transform the keys of the query
      const keyArr = Object.keys(req.query)
      //Append n. to each key
      for (let i = 0; i < keyArr.length; i++) {
        key = keyArr[i]
        keyArr[i] = "n." + key
      }

      query += `REMOVE ${keyArr.join(",")}`
      query += ` RETURN n`

    } else {//Delete all nodes with specified properties

      //Loop through all properties and delete "" around int
      // for (const key of Object.keys(req.query)) { 
      //   let int = parseInt(req.query[key])
      //   if (int) {
      //     req.query[key] = int
      //   } else {
      //     continue
      //   }
      // }

      const properties = transformProps(req.query)
      console.log(properties)
      query = 
      `
      MATCH (n ${properties})
      DETACH DELETE n
      RETURN n
      `
    }

    // res.send(query)
    const write = await session.executeWrite(
      tx => tx.run(
        query
      )
    )

    const result = await session.executeRead(
      tx => tx.run(
        `
        MATCH (n) -[r]-> (m)
        RETURN n,r,m
        `
      )
    )
    await session.close()
    await driver.close()

    res.json(util.neo4jDataToD3(result.records))
  } catch (e) {
    console.error(e)
  }
}



//Delete a node's label
exports.nodeLabel = async (req,res,next) => {
  //Evaluate errors
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {//Create session
    const driver = util.initDriver() 
    const session = driver.session()

    let query
    const label = req.query.label

    if (req.query.id) {
      const id = req.query.id
      query = 
      `
      MATCH (n)
      WHERE id(n) = ${id}
      REMOVE n:${label}
      RETURN n
      `
    } else {//Delete all nodes with the label
      query = 
      `
      MATCH (n:${label})
      DETACH DELETE n
      RETURN n
      `
    }

    const write = await session.executeWrite(
      tx => tx.run(
        query
      )
    )

    const result = await session.executeRead(
      tx => tx.run(
        `
        MATCH (n) -[r]-> (m)
        RETURN n,r,m
        `
      )
    )
    await session.close()
    await driver.close()

    res.json(util.neo4jDataToD3(result.records))
  } catch (e) {
    console.error(e)
  }
}

//Delete a relationship
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
    //Check whether relationship is SYSTEM label
    const read = await session.executeRead(
      tx => tx.run(
        `
        MATCH (n) -[r:SYSTEM]-> (m)
        WHERE Id(r) = ${id}
        RETURN r
        `
      )
    )
    
    if (Object.keys(read.records).length != 0) {
      res.json({"ERROR":"Cannot delete a SYSTEM connection. DELETE respective central node first"}).status(400)
    } else {
      // Delete all system connections on the node
      const del = await session.executeWrite(
        tx => tx.run(
          `
          MATCH (n) -[r]-> (m)
          WHERE Id(r) = ${id}
          DELETE r
          `
        )
      )

      const result = await session.executeRead(
        tx => tx.run(
          `
          MATCH (n) -[r]-> (m)
          RETURN n,r,m
          `
        )
      )

      await session.close()
      await driver.close()

      res.json(util.neo4jDataToD3(result.records))
    }

  } catch (e) {
    console.error(e)
  }
}

//Delete a relationship's properties
exports.relationshipProperty = async (req,res,next) => {
  //Evaluate errors
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {//Create session
    const driver = util.initDriver() 
    const session = driver.session()

    let query

    if (req.query.id) {
      const id = req.query.id
      delete req.query.id

      query = `
      MATCH (n) -[r]-> (m)
      WHERE id(r) = ${id}
      `
      //Transform the keys of the query
      const keyArr = Object.keys(req.query)
      //Append n. to each key
      for (let i = 0; i < keyArr.length; i++) {
        key = keyArr[i]
        keyArr[i] = "r." + key
      }

      query += `REMOVE ${keyArr.join(",")}`
      query += ` RETURN r`

    } else {//Delete all relationships with specified properties

      console.log(req.query)
      const properties = transformProps(req.query)

      console.log("AFTER")
      console.log(properties) 

      query = 
      `
      MATCH (n) -[r ${properties}]->(m)
      DELETE r
      RETURN r
      `
    }

    const write = await session.executeWrite(
      tx => tx.run(
        query
      )
    )
    
    const result = await session.executeRead(
      tx => tx.run(
        `
        MATCH (n) -[r]-> (m)
        RETURN n,r,m
        `
      )
    )
    await session.close()
    await driver.close()

    res.json(util.neo4jDataToD3(result.records))
  } catch (e) {
    console.error(e)
  }
}

//Delete a node's label
exports.relationshipType = async (req,res,next) => {
  //Evaluate errors
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {//Create session
    const driver = util.initDriver() 
    const session = driver.session()

    let query
    const type = req.query.type
    query = 
    `
    MATCH (n) -[r:${type}]-> (m)
    DELETE r
    RETURN r
    `

    const write = await session.executeWrite(
      tx => tx.run(
        query
      )
    )

    const result = await session.executeRead(
      tx => tx.run(
        `
        MATCH (n) -[r]-> (m)
        RETURN n,r,m
        `
      )
    )
    await session.close()
    await driver.close()

    res.json(util.neo4jDataToD3(result.records))
  } catch (e) {
    console.error(e)
  }
}
