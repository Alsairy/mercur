import { AuthenticatedMedusaRequest, MedusaResponse } from '@medusajs/framework'

export const POST = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const integrationId = req.params.id
  const integrationService = req.scope.resolve('governmentIntegrationModuleService') as any
  
  try {
    const integration = await integrationService.retrieveGovernmentIntegration(integrationId)
    
    let testResult
    if (integration.system_type === 'NOOR') {
      testResult = await integrationService.syncWithNoorSystem({ test: true })
    } else if (integration.system_type === 'SOBOL') {
      testResult = await integrationService.syncWithSobolPlatform({ test: true })
    } else {
      throw new Error(`Testing not supported for system type: ${integration.system_type}`)
    }

    res.json({
      success: true,
      test_result: testResult,
      message: 'Integration test completed successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Integration test failed',
      message: (error as Error).message
    })
  }
}
