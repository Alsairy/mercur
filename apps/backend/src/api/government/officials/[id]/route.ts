import { MedusaRequest, MedusaResponse } from '@medusajs/framework'

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const governmentService = req.scope.resolve('government')
  
  const official = await governmentService.retrieveGovernmentOfficial(req.params.id)
  
  res.json({ official })
}

export const PUT = async (req: MedusaRequest, res: MedusaResponse) => {
  const governmentService = req.scope.resolve('government')
  
  const official = await governmentService.updateGovernmentOfficials(
    req.params.id,
    req.body
  )
  
  res.json({ official })
}

export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
  const governmentService = req.scope.resolve('government')
  
  await governmentService.deleteGovernmentOfficials(req.params.id)
  
  res.status(204).send()
}
