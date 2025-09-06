import { AuthenticatedMedusaRequest, MedusaResponse } from '@medusajs/framework'

export const PUT = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const integrationId = req.params.id
  const integrationService = req.scope.resolve('governmentIntegrationModuleService') as any
  
  try {
    const integration = await integrationService.updateGovernmentIntegrations([{
      id: integrationId,
      ...(req.validatedBody as any)
    }])

    res.json({
      success: true,
      integration: integration[0],
      message: 'Integration configuration updated successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update integration configuration',
      message: (error as Error).message
    })
  }
}
