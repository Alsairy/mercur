import { AuthenticatedMedusaRequest, MedusaResponse } from '@medusajs/framework'

import { REQUESTS_MODULE, RequestsModuleService } from '@mercurjs/requests'
import { updateRequestWorkflow } from '../../../../../workflows/requests/workflows/update-request'

export const POST = async (req: AuthenticatedMedusaRequest, res: MedusaResponse) => {
  const requestId = req.params.id
  const approvalData = req.body as { approved: boolean; notes?: string }

  try {
    const requestsService = req.scope.resolve<RequestsModuleService>(REQUESTS_MODULE)
    const request = await requestsService.retrieveRequest(requestId)

    if (request.type !== 'rfq') {
      return res.status(400).json({
        success: false,
        error: 'Invalid request type for RFQ approval'
      })
    }

    if (!request.requires_government_approval) {
      return res.status(400).json({
        success: false,
        error: 'This RFQ does not require government approval'
      })
    }

    const { result } = await updateRequestWorkflow.run({
      input: {
        id: requestId,
        status: approvalData.approved ? 'accepted' : 'rejected',
        reviewer_id: req.auth_context?.actor_id || 'government-system',
        reviewer_note: approvalData.notes || ''
      },
      container: req.scope
    })

    res.json({
      success: true,
      request: result,
      message: `RFQ ${approvalData.approved ? 'approved' : 'rejected'} successfully`
    })
  } catch {
    res.status(500).json({
      success: false,
      error: 'Failed to process RFQ approval'
    })
  }
}
