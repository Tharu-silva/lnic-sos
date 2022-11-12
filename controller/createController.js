const nodeRoute = require('../routes/node')
const relationshipRoute = require('../routes/relationship')
const {driver} = require('../app')
const { validationResult } = require('express-validator')
//Create node with label and properties
exports.node = async (req,res,next) => {
  //Evaluate errors
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //Create session
  const session = driver.session()

  //Find superkey collisions
  //Transform params to required format
  const label = req.params.label.toUpperCase()
  delete req.params.label;
  const properties = req.params
  //Add the node to database
  const response = await session.executeWrite(
    tx => tx.run(
      `
      MERGE (n:${label} {${properties}})
      RETURN n
      `
    )
  )
  
  await session.close()

  const createdNode = response.records.get(label)
  res.state(200).json(createdNode)
}

//Create a relationship between two existing nodes
exports.relationship = async (req,res,next) => {
  //Evaluate errors
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //Add relationship using merge
  const session = driver.session()
  const label = req.params.label.toUpperCase()

  const res = await session.executeWrite(
    tx => tx.run(
      `MERGE (n1) -[r:${label}]-> (n2)
      WHERE id(n1) = ${req.params.start} AND id(n2) = ${req.params.end}
      return r`
    )
  )

  await session.close()

  const createdRelationship = r.records.get(label)
  res.state(200).json(createdRelationship)
}

