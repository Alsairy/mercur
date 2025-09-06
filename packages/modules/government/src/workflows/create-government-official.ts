import { WorkflowResponse, createWorkflow } from '@medusajs/workflows-sdk'

export const createGovernmentOfficialWorkflow = createWorkflow(
  'create-government-official',
  function (input: any) {
    return new WorkflowResponse(input)
  }
)
