import { WorkflowResponse, createWorkflow } from '@medusajs/workflows-sdk'

import { emitMultipleEventsStep } from '../../common/steps'
import { updateRequestStep } from '../steps/update-request'
import { updateQuotationStep } from '../steps/update-quotation'

export const selectQuotationWorkflow = createWorkflow(
  'select-quotation',
  function (input: {
    request_id: string
    selected_quotation_id: string
    evaluation_notes?: string
    requires_government_approval?: boolean
  }) {
    const selectedQuotation = updateQuotationStep({
      id: input.selected_quotation_id,
      status: 'selected',
      evaluation_notes: input.evaluation_notes
    })

    const updatedRequest = updateRequestStep({
      id: input.request_id,
      status: input.requires_government_approval ? 'pending' : 'accepted'
    })

    emitMultipleEventsStep([
      {
        name: 'quotation.selected',
        data: { quotation_id: input.selected_quotation_id, request_id: input.request_id }
      },
      {
        name: 'service-provider.notify',
        data: { quotation_id: input.selected_quotation_id, status: 'selected' }
      }
    ])
    return new WorkflowResponse({ quotation: selectedQuotation, request: updatedRequest })
  }
)
