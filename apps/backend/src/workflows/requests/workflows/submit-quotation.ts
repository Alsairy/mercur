import { WorkflowResponse, createWorkflow } from '@medusajs/workflows-sdk'
import { CreateQuotationDTO } from '@mercurjs/framework'

import { emitMultipleEventsStep } from '../../common/steps'
import { createQuotationStep } from '../steps/create-quotation'

export const submitQuotationWorkflow = createWorkflow(
  'submit-quotation',
   function (input: CreateQuotationDTO & {
    requires_government_approval?: boolean
  }) {
    const quotation = createQuotationStep({
      ...input,
      status: 'submitted'
    })

    emitMultipleEventsStep([
      {
        name: 'quotation.submitted',
        data: { quotation_id: quotation[0].id, request_id: input.request_id }
      },
      {
        name: 'school.notify',
        data: { request_id: input.request_id, quotation_id: quotation[0].id }
      }
    ])
    return new WorkflowResponse(quotation)
  }
)
