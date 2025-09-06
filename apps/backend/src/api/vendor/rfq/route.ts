import { AuthenticatedMedusaRequest, MedusaResponse } from '@medusajs/framework'

import { createRFQWorkflow } from '../../../workflows/requests/workflows/create-rfq'

export const POST = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {

  const { result } = await createRFQWorkflow.run({
    input: {
      submitter_id: req.auth_context.actor_id,
      ...(req.validatedBody || {}),
      type: 'rfq'
    },
    container: req.scope
  })

  res.status(201).json({ 
    success: true,
    rfq: result[0],
    message: 'RFQ created successfully'
  })
}

export const GET = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const requestsService = req.scope.resolve('requests') as any

  try {
    const requests = await requestsService.listRequests({
      type: 'rfq'
    })

    res.json({
      success: true,
      rfqs: requests
    })
  } catch {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve RFQs'
    })
  }
}
