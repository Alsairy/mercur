import { WorkflowResponse, createWorkflow } from '@medusajs/workflows-sdk'

import { AcceptRequestDTO } from '@mercurjs/framework'

import { updateRequestWorkflow } from './update-request'

export const acceptServiceRequestWorkflow = createWorkflow(
  'accept-service-request',
  function (input: AcceptRequestDTO & {
    government_approval?: boolean
    approver_notes?: string
  }) {
    const updatedRequest = updateRequestWorkflow.runAsStep({ 
      input: {
        ...input,
        status: 'accepted',
        reviewer_note: input.approver_notes
      }
    })

    return new WorkflowResponse(updatedRequest)
  }
)
