import { MedusaRequest, MedusaResponse } from '@medusajs/framework'

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const governmentService = req.scope.resolve('government')
  
  const entities = await governmentService.listAndCountGovernmentEntities({}, {})
  
  res.json({ entities: entities[0], count: entities[1] })
}

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const governmentService = req.scope.resolve('government')
  
  const entity = await governmentService.createGovernmentEntities(req.body)
  
  res.status(201).json({ entity })
}
