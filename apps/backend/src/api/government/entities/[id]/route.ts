import { MedusaRequest, MedusaResponse } from '@medusajs/framework'

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const governmentService = req.scope.resolve('government')
  
  const entity = await governmentService.retrieveGovernmentEntity(req.params.id)
  
  res.json({ entity })
}

export const PUT = async (req: MedusaRequest, res: MedusaResponse) => {
  const governmentService = req.scope.resolve('government')
  
  const entity = await governmentService.updateGovernmentEntities(
    req.params.id,
    req.body
  )
  
  res.json({ entity })
}

export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
  const governmentService = req.scope.resolve('government')
  
  await governmentService.deleteGovernmentEntities(req.params.id)
  
  res.status(204).send()
}
