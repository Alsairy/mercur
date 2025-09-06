import { AuthenticatedMedusaRequest, MedusaResponse } from '@medusajs/framework'

export const POST = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const integrationService = req.scope.resolve('governmentIntegrationModuleService') as any
  
  const body = req.validatedBody as any
  const integration = await integrationService.createGovernmentIntegrations([{
    entity_id: body.entity_id,
    system_type: body.system_type,
    api_endpoint: body.api_endpoint,
    authentication_config: body.authentication_config,
    data_mapping_config: body.data_mapping_config,
    webhook_url: body.webhook_url,
    sync_frequency: body.sync_frequency || 'MANUAL',
    is_active: body.is_active !== false
  }])

  res.status(201).json({
    success: true,
    integration: integration[0],
    message: 'Government integration created successfully'
  })
}

export const GET = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const integrationService = req.scope.resolve('governmentIntegrationModuleService') as any
  const integrations = await integrationService.listGovernmentIntegrations()

  res.json({
    success: true,
    integrations
  })
}
