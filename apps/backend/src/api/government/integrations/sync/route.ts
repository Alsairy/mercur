import { AuthenticatedMedusaRequest, MedusaResponse } from '@medusajs/framework'

export const POST = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const integrationService = req.scope.resolve('governmentIntegrationModuleService') as any
  const { system_type, data } = req.validatedBody as { system_type: string, data: Record<string, unknown> }
  
  try {
    let result
    
    if (system_type === 'NOOR') {
      result = await integrationService.syncWithNoorSystem(data)
    } else if (system_type === 'SOBOL') {
      result = await integrationService.syncWithSobolPlatform(data)
    } else {
      return res.status(400).json({
        success: false,
        error: `Unsupported system type: ${system_type}`
      })
    }

    res.json({
      success: true,
      result,
      message: `Data synchronized with ${system_type} successfully`
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Synchronization failed',
      message: (error as Error).message
    })
  }
}
