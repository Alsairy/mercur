import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework'
import { syncQuotationWithSobolWorkflow } from '../workflows/government-integration/workflows/sync-quotation-with-sobol'

export default async function quotationSobolSyncHandler({
  event,
  container
}: SubscriberArgs<Record<string, unknown>>) {
  const { quotation_id, service_provider_id, service_category } = event.data as {
    quotation_id: string
    service_provider_id: string
    service_category: string
  }
  
  const trainingCategories = ['training', 'curriculum_support', 'professional_development']
  const training_related = trainingCategories.includes(service_category)
  
  if (training_related) {
    await syncQuotationWithSobolWorkflow(container).run({
      input: {
        quotation_id,
        service_provider_id,
        service_category,
        training_related
      }
    })
  }
}

export const config: SubscriberConfig = {
  event: 'quotation.submitted',
  context: {
    subscriberId: 'quotation-sobol-sync-handler'
  }
}
