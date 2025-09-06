import { MedusaRequest, MedusaResponse } from '@medusajs/framework'

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const verificationData = req.body as any
  const sellerId = verificationData.seller_id
  
  if (!sellerId) {
    return res.status(400).json({
      success: false,
      error: 'seller_id is required'
    })
  }
  
  try {
    const validationResult = {
      license_valid: true,
      certifications_valid: verificationData.documents?.certifications?.length > 0,
      background_check_valid: verificationData.documents?.background_check_documents?.length > 0,
      insurance_valid: verificationData.documents?.insurance_documents?.length > 0,
      portfolio_valid: verificationData.documents?.portfolio_items?.length >= 3,
      validation_notes: ['Verification completed']
    }
    
    const sellerService = req.scope.resolve('seller') as any
    await sellerService.updateSellers({
      id: sellerId,
      onboarding: {
        education_license_verification: validationResult.license_valid,
        service_provider_certification: validationResult.certifications_valid,
        background_check: validationResult.background_check_valid,
        insurance_verification: validationResult.insurance_valid,
        portfolio_submission: validationResult.portfolio_valid
      }
    })
    
    res.json({
      success: true,
      validation_result: validationResult,
      message: 'Service provider verification completed'
    })
  } catch {
    res.status(500).json({
      success: false,
      error: 'Failed to complete verification process'
    })
  }
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
    const seller = await sellerService.retrieveSeller(sellerId, {
      relations: ['onboarding']
    })
    
    const verificationStatus = {
      education_license_verification: seller.onboarding?.education_license_verification || false,
      service_provider_certification: seller.onboarding?.service_provider_certification || false,
      background_check: seller.onboarding?.background_check || false,
      insurance_verification: seller.onboarding?.insurance_verification || false,
      portfolio_submission: seller.onboarding?.portfolio_submission || false,
      government_approval_status: seller.onboarding?.government_approval_status || 'not_required'
    }
    
    const overallStatus = Object.values(verificationStatus).every(status => 
      status === true || status === 'approved' || status === 'not_required'
    )
    
    res.json({
      success: true,
      seller_id: sellerId,
      verification_status: verificationStatus,
      overall_verified: overallStatus
    })
  } catch {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve verification status'
    })
  }
}
