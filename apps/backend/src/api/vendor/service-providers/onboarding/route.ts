import { MedusaRequest, MedusaResponse } from '@medusajs/framework'

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const { serviceProviderOnboardingWorkflow } = await import('../../../../workflows/seller/workflows/service-provider-onboarding.js')
  
  const onboardingData = req.body as any
  
  const result = await serviceProviderOnboardingWorkflow.run({
    input: {
      seller_data: onboardingData.seller_data,
      onboarding_data: onboardingData.onboarding_data,
      requires_government_approval: onboardingData.requires_government_approval || false
    }
  })
  
  res.status(201).json({
    success: true,
    seller: result.result.seller,
    validation_result: result.result.validation_result,
    government_approval: result.result.government_approval,
    message: 'Service provider onboarding initiated successfully'
  })
}

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const sellerService = req.scope.resolve('seller') as any
  const sellerId = req.query.seller_id as string
  
  if (!sellerId) {
    return res.status(400).json({
      success: false,
      error: 'seller_id is required'
    })
  }
  
  try {
    const isBasicComplete = await sellerService.isOnboardingCompleted(sellerId)
    const isServiceProviderComplete = await sellerService.isServiceProviderOnboardingCompleted(sellerId)
    
    const seller = await sellerService.retrieveSeller(sellerId, {
      relations: ['onboarding']
    })
    
    res.json({
      success: true,
      seller_id: sellerId,
      onboarding_status: {
        basic_onboarding_complete: isBasicComplete,
        service_provider_onboarding_complete: isServiceProviderComplete,
        overall_complete: isServiceProviderComplete
      },
      onboarding_details: seller.onboarding
    })
  } catch {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve onboarding status'
    })
  }
}
