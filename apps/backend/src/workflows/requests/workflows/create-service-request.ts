import { WorkflowResponse, createWorkflow } from '@medusajs/workflows-sdk'

import {
  CreateRequestDTO,
  RequestUpdated
} from '@mercurjs/framework'

import { emitMultipleEventsStep } from '../../common/steps'
import { createRequestStep } from '../steps'

export const createServiceRequestWorkflow = createWorkflow(
  'create-service-request',
  function (input: CreateRequestDTO & {
    service_category?: string
    requires_government_approval?: boolean
    government_approver_type?: string
  }) {
    const request = createRequestStep(input)

    emitMultipleEventsStep([
      {
        name: 'service-request.created',
        data: input
      },
      {
        name: RequestUpdated.CREATED,
        data: input
      }
    ])
    return new WorkflowResponse(request)
  }
)
