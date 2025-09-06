import { AuthenticatedMedusaRequest, MedusaResponse } from '@medusajs/framework'

import { REQUESTS_MODULE, RequestsModuleService } from '@mercurjs/requests'
import { selectQuotationWorkflow } from '../../../../../workflows/requests/workflows/select-quotation'

export const POST = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const requestId = req.params.id
  const selectionData = req.body as any

  try {
    const requestsService = req.scope.resolve<RequestsModuleService>(REQUESTS_MODULE)
    const request = await requestsService.retrieveRequest(requestId)

    if (request.type !== 'rfq') {
      return res.status(400).json({
        success: false,
        error: 'Invalid request type for quotation selection'
      })
    }

    const { result } = await selectQuotationWorkflow.run({
      input: {
        request_id: requestId,
        selected_quotation_id: selectionData.quotation_id,
        evaluation_notes: selectionData.evaluation_notes,
        requires_government_approval: request.requires_government_approval
      },
      container: req.scope
    })

    res.json({
      success: true,
      result,
      message: 'Quotation selected successfully'
    })
  } catch {
    res.status(500).json({
      success: false,
      error: 'Failed to select quotation'
    })
  }
}
