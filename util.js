//Evaluate errors in a route handler
const {driver} = require('./app')

export function getErrors(req) {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
}

export async function findNodeById(id) {
  const session = driver.session()

  const res = await session.executeRead(
    tx => tx.run(
      `
      MATCH (n) where id(n) = ${id}
      `
    )
  )

  //TODO: Find a way to validatae whether the node exists
}