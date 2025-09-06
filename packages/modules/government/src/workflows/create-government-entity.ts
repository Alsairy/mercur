import { WorkflowResponse, createWorkflow } from '@medusajs/workflows-sdk'

export const createGovernmentEntityWorkflow = createWorkflow(
  'create-government-entity',
  function (input: any) {
    return new WorkflowResponse(input)
  }
)
