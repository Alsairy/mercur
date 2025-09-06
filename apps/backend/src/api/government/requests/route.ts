import { MedusaRequest, MedusaResponse } from '@medusajs/framework'

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const requestsService = req.scope.resolve('requests')
  
  const governmentRequests = await requestsService.listAndCountRequests({
    requires_government_approval: true,
    ...req.query
  })
  
  res.json({ requests: governmentRequests[0], count: governmentRequests[1] })
}

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const { createServiceRequestWorkflow } = await import('../../../workflows/requests/workflows/create-service-request.js')
  
  const requestData = req.body
  const result = await createServiceRequestWorkflow.run({
    input: {
      type: requestData.type,
      data: requestData.data,
      submitter_id: requestData.submitter_id,
      service_category: requestData.service_category,
      requires_government_approval: true,
      government_approver_type: requestData.government_approver_type
    }
  })
  
  res.status(201).json({ request: result.result })
}
