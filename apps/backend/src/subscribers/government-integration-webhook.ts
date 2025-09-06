import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework'

export default async function governmentIntegrationWebhookHandler({
  event,
  container
}: SubscriberArgs<Record<string, unknown>>) {
  const integrationService = container.resolve('governmentIntegrationModuleService') as any
  
  const { data, headers } = event.data as { data: Record<string, unknown>, headers: Record<string, string> }
  
  if (headers['x-noor-signature']) {
    await integrationService.handleWebhook('NOOR', data)
  } else if (headers['x-sobol-signature']) {
    await integrationService.handleWebhook('SOBOL', data)
  }
}

export const config: SubscriberConfig = {
  event: 'government.*.webhook.received',
  context: {
    subscriberId: 'government-integration-webhook-handler'
  }
}
