import { MedusaRequest, MedusaResponse } from '@medusajs/framework'

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const governmentService = req.scope.resolve('government')
  
  const officials = await governmentService.listAndCountGovernmentOfficials({}, {})
  
  res.json({ officials: officials[0], count: officials[1] })
}

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const governmentService = req.scope.resolve('government')
  
  const official = await governmentService.createGovernmentOfficials(req.body)
  
  res.status(201).json({ official })
}
