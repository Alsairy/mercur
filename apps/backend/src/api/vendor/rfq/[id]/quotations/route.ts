import { AuthenticatedMedusaRequest, MedusaResponse } from '@medusajs/framework'

import { REQUESTS_MODULE, RequestsModuleService } from '@mercurjs/requests'

export const GET = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const requestId = req.params.id

  try {
    const requestsService = req.scope.resolve<RequestsModuleService>(REQUESTS_MODULE)
    const request = await requestsService.retrieveRequest(requestId)

    if (request.type !== 'rfq') {
      return res.status(400).json({
        success: false,
        error: 'Invalid request type'
      })
    }

    const quotations = await requestsService.listQuotations({
      request_id: requestId
    })

    res.json({
      success: true,
      quotations
    })
  } catch {
    res.status(404).json({
      success: false,
      error: 'RFQ not found'
    })
  }
}
