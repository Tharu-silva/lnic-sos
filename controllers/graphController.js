const { sanitize } = require('express-validator');
const util = require('../util');

exports.getGraph =  async(req,res) => {
  let driver = util.initDriver();

  //Create session
  try {
    const session = driver.session()

    const response = await session.executeRead(
      tx => tx.run(
        `
        MATCH (k)
        RETURN k
        UNION ALL
        MATCH (n) -[k]-> (m)
        RETURN k
        `
      )
    )
    
    await session.close()
    await driver.close()
    res.json(util.neo4jDataToD3(response.records))
    // res.status(200).json(util.neo4jDataToD3(response.records))
  } catch (error) {
    console.error(error)
  }
}


exports.getShortestPath = async (req, res) => {
  let driver = util.initDriver();

  let startId = req.query.start
  let endId = req.query.end

  //Create session
  try {
    const session = driver.session()

    const query = `
    MATCH (start),(end), 
    p = shortestPath((start)-[*..15]-(end)) 
    WHERE id(start) = ${startId} AND id(end) = ${endId} 
    RETURN p
    `
    const response = await session.executeRead(
      tx => tx.run(
        query
      )
    )
    
    await session.close()
    await driver.close()
    res.json(response.records[0]['_fields']) 
  } catch (error) {
    console.error(error)
  }
}

exports.platformNumber = async (req, res) => {
  try {
  let driver = util.initDriver();
  const session = driver.session();

  const platforms = await session.executeRead(
    tx => tx.run(
      `
      MATCH (n:PLATFORM)
      return n
      `
    )
  )

  const systems = await session.executeRead(
    tx => tx.run(
    `
    MATCH (n:SYSTEM)
    return n
    `
  ))
  await session.close()
  await driver.close()
  
  const platformNoRaw = util.neo4jDataToD3(platforms.records)
  const systemNoRaw = util.neo4jDataToD3(systems.records)
  const platformNo = platformNoRaw["nodes"].length()
  const systemNo = sanitizedData["nodes"].length()
  res.json({"Platforms": platformNo, "Systems": systemNo})


  } catch (e) {
    console.error(e)
  }  
}