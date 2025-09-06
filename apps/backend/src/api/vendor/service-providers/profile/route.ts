import { MedusaRequest, MedusaResponse } from '@medusajs/framework'

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const sellerService = req.scope.resolve('seller') as any
  const sellerId = req.params.id || req.query.seller_id as string
  
  if (!sellerId) {
    return res.status(400).json({
      success: false,
      error: 'seller_id is required'
    })
  }
  
  try {
    const seller = await sellerService.retrieveSeller(sellerId, {
      relations: ['onboarding', 'members']
    })
    
    const serviceProviderProfile = {
      id: seller.id,
      name: seller.name,
      handle: seller.handle,
      description: seller.description,
      photo: seller.photo,
      contact: {
        email: seller.email,
        phone: seller.phone
      },
      address: {
        address_line: seller.address_line,
        city: seller.city,
        state: seller.state,
        postal_code: seller.postal_code,
        country_code: seller.country_code
      },
      education_info: {
        license_number: seller.education_license_number,
        school_type: seller.school_type,
        education_level: seller.education_level,
        service_categories: seller.service_categories
      },
      onboarding_status: seller.onboarding,
      verification_status: {
        education_license: seller.onboarding?.education_license_verification || false,
        certifications: seller.onboarding?.service_provider_certification || false,
        background_check: seller.onboarding?.background_check || false,
        insurance: seller.onboarding?.insurance_verification || false,
        portfolio: seller.onboarding?.portfolio_submission || false,
        government_approval: seller.onboarding?.government_approval_status || 'not_required'
      }
    }
    
    res.json({
      success: true,
      service_provider: serviceProviderProfile
    })
  } catch {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve service provider profile'
    })
  }
}

export const PUT = async (req: MedusaRequest, res: MedusaResponse) => {
  const sellerService = req.scope.resolve('seller') as any
  const sellerId = req.params.id || req.query.seller_id as string
  const updateData = req.body as any
  
  if (!sellerId) {
    return res.status(400).json({
      success: false,
      error: 'seller_id is required'
    })
  }
  
  try {
    const updatedSeller = await sellerService.updateSellers({
      id: sellerId,
      ...updateData
    })
    
    res.json({
      success: true,
      service_provider: updatedSeller,
      message: 'Service provider profile updated successfully'
    })
  } catch {
    res.status(500).json({
      success: false,
      error: 'Failed to update service provider profile'
    })
  }
}
