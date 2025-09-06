import { WorkflowResponse, createWorkflow } from '@medusajs/workflows-sdk'
import { emitMultipleEventsStep } from '../../common/steps'
import { syncWithNoorSystemStep } from '../steps/sync-with-noor-system'

export const syncRFQWithGovernmentWorkflow = createWorkflow(
  'sync-rfq-with-government',
  function (input: {
    rfq_id: string
    school_id: string
    service_category: string
    requires_government_approval: boolean
  }) {
    const noorSync = syncWithNoorSystemStep({
      integration_id: 'noor-rfq-sync',
      data_type: 'SERVICE_REQUEST',
      payload: {
        rfq_id: input.rfq_id,
        school_id: input.school_id,
        service_category: input.service_category,
        status: 'submitted'
      }
    })

    emitMultipleEventsStep([
      {
        name: 'government.rfq.synced',
        data: { rfq_id: input.rfq_id, system: 'NOOR' }
      }
    ])

    return new WorkflowResponse(noorSync)
  }
)
