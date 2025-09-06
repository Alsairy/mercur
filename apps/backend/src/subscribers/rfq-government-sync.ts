import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework'
import { syncRFQWithGovernmentWorkflow } from '../workflows/government-integration/workflows/sync-rfq-with-government'

export default async function rfqGovernmentSyncHandler({
  event,
  container
}: SubscriberArgs<Record<string, unknown>>) {
  const { rfq_id, service_category, requires_government_approval, school_id } = event.data as {
    rfq_id: string
    service_category: string
    requires_government_approval: boolean
    school_id: string
  }
  
  if (requires_government_approval) {
    await syncRFQWithGovernmentWorkflow(container).run({
      input: {
        rfq_id,
        school_id,
        service_category,
        requires_government_approval: true
      }
    })
  }
}

export const config: SubscriberConfig = {
  event: 'rfq.created',
  context: {
    subscriberId: 'rfq-government-sync-handler'
  }
}
