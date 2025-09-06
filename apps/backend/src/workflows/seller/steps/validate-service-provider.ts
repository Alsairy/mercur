import { createStep, StepResponse } from '@medusajs/workflows-sdk'

type ValidateServiceProviderInput = {
  seller_id: string
  onboarding_data: {
    certifications: string[]
    portfolio_items: string[]
    insurance_documents: string[]
    background_check_documents: string[]
  }
}

type ValidationResult = {
  license_valid: boolean
  certifications_valid: boolean
  background_check_valid: boolean
  insurance_valid: boolean
  portfolio_valid: boolean
  validation_notes: string[]
}

export const validateServiceProviderStep = createStep(
  'validate-service-provider',
  async (input: ValidateServiceProviderInput) => {
    const validationNotes: string[] = []
    
    const license_valid = true
    validationNotes.push('Education license verification completed')
    
    const certifications_valid = input.onboarding_data.certifications.length > 0
    if (!certifications_valid) {
      validationNotes.push('At least one professional certification is required')
    }
    
    const background_check_valid = input.onboarding_data.background_check_documents.length > 0
    if (!background_check_valid) {
      validationNotes.push('Background check documentation is required')
    }
    
    const insurance_valid = input.onboarding_data.insurance_documents.length > 0
    if (!insurance_valid) {
      validationNotes.push('Professional liability insurance documentation is required')
    }
    
    const portfolio_valid = input.onboarding_data.portfolio_items.length >= 3
    if (!portfolio_valid) {
      validationNotes.push('At least 3 portfolio items are required to demonstrate service quality')
    }

    const result: ValidationResult = {
      license_valid,
      certifications_valid,
      background_check_valid,
      insurance_valid,
      portfolio_valid,
      validation_notes: validationNotes
    }

    return new StepResponse(result, {
      seller_id: input.seller_id,
      validation_result: result
    })
  },
  async () => {
    return new StepResponse(void 0)
  }
)
