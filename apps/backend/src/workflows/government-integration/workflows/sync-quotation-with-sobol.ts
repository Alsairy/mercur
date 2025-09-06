import { WorkflowResponse, createWorkflow } from '@medusajs/workflows-sdk'
import { emitMultipleEventsStep } from '../../common/steps'
import { syncWithSobolPlatformStep } from '../steps/sync-with-sobol-platform'

export const syncQuotationWithSobolWorkflow = createWorkflow(
  'sync-quotation-with-sobol',
  function (input: {
    quotation_id: string
    service_provider_id: string
    service_category: string
    training_related: boolean
  }) {
    const sobolSync = syncWithSobolPlatformStep({
      integration_id: 'sobol-quotation-sync',
      data_type: 'TRAINING_PROGRAM',
      payload: {
        quotation_id: input.quotation_id,
        service_provider_id: input.service_provider_id,
        service_category: input.service_category,
        status: 'submitted'
      }
    })

    emitMultipleEventsStep([
      {
        name: 'government.quotation.synced',
        data: { quotation_id: input.quotation_id, system: 'SOBOL' }
      }
    ])

    return new WorkflowResponse(sobolSync)
  }
)
