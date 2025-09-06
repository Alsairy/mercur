import { createStep, StepResponse } from '@medusajs/workflows-sdk'
import { MedusaError } from '@medusajs/utils'

type SubmitForGovernmentApprovalInput = {
  seller_id: string
  service_categories: string[]
  documents: {
    certifications: string[]
    portfolio_items: string[]
    insurance_documents: string[]
    background_check_documents: string[]
  }
}

type GovernmentApprovalResult = {
  approval_request_id: string
  status: 'submitted' | 'pending' | 'approved' | 'rejected'
  approver_type: 'MOE' | 'ETEC' | 'MUNICIPALITY'
  submission_date: Date
  estimated_review_time: string
}

export const submitForGovernmentApprovalStep = createStep(
  'submit-for-government-approval',
  async (input: SubmitForGovernmentApprovalInput) => {
    let approver_type: 'MOE' | 'ETEC' | 'MUNICIPALITY' = 'MOE'
    
    if (input.service_categories.includes('construction')) {
      approver_type = 'MUNICIPALITY'
    } else if (input.service_categories.includes('training') || input.service_categories.includes('curriculum_support')) {
      approver_type = 'ETEC'
    }

    const approval_request_id = `gov_req_${Date.now()}_${input.seller_id.slice(-6)}`
    
    try {
      const response = await fetch(`${process.env.GOVERNMENT_API_URL}/requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GOVERNMENT_API_KEY}`
        },
        body: JSON.stringify({
          type: 'service_provider_approval',
          submitter_id: input.seller_id,
          service_category: input.service_categories.join(','),
          requires_government_approval: true,
          government_approver_type: approver_type,
          data: {
            seller_id: input.seller_id,
            service_categories: input.service_categories,
            documents: input.documents,
            submission_date: new Date().toISOString()
          }
        })
      })

      if (!response.ok) {
        throw new Error('Failed to submit government approval request')
      }

      const result: GovernmentApprovalResult = {
        approval_request_id,
        status: 'submitted',
        approver_type,
        submission_date: new Date(),
        estimated_review_time: '5-10 business days'
      }

      return new StepResponse(result, {
        approval_request_id,
        seller_id: input.seller_id
      })
    } catch (error) {
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        `Failed to submit for government approval: ${(error as Error).message}`
      )
    }
  },
  async () => {
    return new StepResponse(void 0)
  }
)
