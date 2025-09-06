import { MedusaRequest, MedusaResponse } from '@medusajs/framework'

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const { acceptServiceRequestWorkflow } = await import('../../../../../workflows/requests/workflows/accept-service-request.js')
  
  const requestData = req.body as any
  const result = await acceptServiceRequestWorkflow.run({
    input: {
      id: req.params.id,
      government_approval: true,
      approver_notes: requestData.notes,
      data: requestData
    }
  })
  
  res.json({ request: result.result })
}
