const nodeRoute = require('../routes/node')
const relationshipRoute = require('../routes/relationship')
const {driver} = require('../app')

//Update property
exports.node = async (req,res,next) => {
  //Evaluate errors
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const session = driver.session()
  const nodeId = req.query.id
  delete req.query.id

  const key = Object.keys(req.query)[0]
  const value = req.query.key
  const response = await session.executeWrite(
    tx => tx.run(
      `MATCH (n) where id(n) = ${nodeId}
      SET n.${key} = ${value}
      return n`
    )
  )

  await session.close()

  //TODO: Find a way to get the created record out of the return json
}

//Update node label
exports.nodeLabel = async (req,res,next) => {
  //Evaluate errors
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const session = driver.session()
  const nodeId = req.query.id
  delete req.query.id
  const key = Object.keys(req.query)[0]
  const value = req.query.key

  const response = await session.executeWrite(
    tx => tx.run(
      `
      MATCH (n) 
      WHERE Id(n) = ${nodeId}
      REMOVE n:${key}
      SET n:${value}
      `
    )
  )
  
  await session.close()

  //TODO: Find a way to get the created record out of the return json
  
}

//Update relationship properties
exports.relationship = async (req,res,next) => {
  //Evaluate errors
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const session = driver.session()
  const relId = req.query.id
  delete req.query.id
  const key = Object.keys(req.query)[0]
  const value = req.query.key

  const response = await session.executeWrite(
    tx => tx.run(
      `
      MATCH (n) -[r]-> (m) 
      WHERE Id(r) = ${relId}
      SET n.${key} = ${value}
      `
    )
  )

  //TODO: Find a way to get the created record out of the return json

}


