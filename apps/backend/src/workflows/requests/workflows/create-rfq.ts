import { WorkflowResponse, createWorkflow } from '@medusajs/workflows-sdk'

import {
  CreateRequestDTO,
  RequestUpdated
} from '@mercurjs/framework'

import { emitMultipleEventsStep } from '../../common/steps'
import { createRequestStep } from '../steps'

export const createRFQWorkflow = createWorkflow(
  'create-rfq',
  function (input: CreateRequestDTO & {
    service_category: string
    requires_government_approval?: boolean
    government_approver_type?: string
     evaluation_criteria?: Record<string, unknown>
    deadline?: string
  }) {
    const request = createRequestStep({
      ...input,
      type: 'rfq'
    })

    emitMultipleEventsStep([
      {
        name: 'rfq.created',
        data: input
      },
      {
        name: 'service-providers.notify',
        data: { request_id: request[0].id, service_category: input.service_category }
      },
      {
        name: RequestUpdated.CREATED,
        data: input
      }
    ])
    return new WorkflowResponse(request)
  }
)
