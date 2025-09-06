import { AuthenticatedMedusaRequest, MedusaResponse } from '@medusajs/framework'

export const GET = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const integrationService = req.scope.resolve('governmentIntegrationModuleService') as any
  const { integration_id, operation_type, status } = req.query as {
    integration_id?: string
    operation_type?: string
    status?: string
  }
  
  try {
    const filters: Record<string, unknown> = {}
    if (integration_id) filters.integration_id = integration_id
    if (operation_type) filters.operation_type = operation_type
    if (status) filters.status = status

    const logs = await integrationService.listIntegrationLogs(filters)

    res.json({
      success: true,
      logs,
      message: 'Integration logs retrieved successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve integration logs',
      message: (error as Error).message
    })
  }
}
