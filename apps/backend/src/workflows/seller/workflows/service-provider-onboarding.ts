import { createWorkflow, WorkflowResponse } from '@medusajs/workflows-sdk'
import { createSellerStep } from '../steps/create-seller'
import { updateSellerStep } from '../steps/update-seller'
import { validateServiceProviderStep } from '../steps/validate-service-provider'
import { submitForGovernmentApprovalStep } from '../steps/submit-for-government-approval'

type ServiceProviderOnboardingInput = {
  seller_data: {
    name: string
    email: string
    phone: string
    education_license_number?: string
    school_type?: 'private' | 'international' | 'public'
    education_level?: 'elementary' | 'middle' | 'high' | 'university'
    service_categories: string[]
    address_line?: string
    city?: string
    state?: string
    postal_code?: string
    country_code?: string
  }
  onboarding_data: {
    certifications: string[]
    portfolio_items: string[]
    insurance_documents: string[]
    background_check_documents: string[]
  }
  requires_government_approval?: boolean
}

export const serviceProviderOnboardingWorkflow = createWorkflow(
  'service-provider-onboarding',
  (input: ServiceProviderOnboardingInput) => {
    const seller = createSellerStep(input.seller_data)
    
    const validationResult = validateServiceProviderStep({
      seller_id: seller.id,
      onboarding_data: input.onboarding_data
    })
    
    const updatedSeller = updateSellerStep({
      id: seller.id
    })

    let governmentApprovalResult
    if (input.requires_government_approval) {
      governmentApprovalResult = submitForGovernmentApprovalStep({
        seller_id: seller.id,
        service_categories: input.seller_data.service_categories,
        documents: input.onboarding_data
      })
    }

    return new WorkflowResponse({
      seller: updatedSeller,
      validation_result: validationResult,
      government_approval: governmentApprovalResult
    })
  }
)
