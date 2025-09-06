import { WorkflowResponse, createWorkflow } from '@medusajs/workflows-sdk'
import { validateNafathIdentityStep } from '../steps/validate-nafath-identity'

type CreateGovernmentOfficialInput = {
  name: string
  email: string
  phone?: string
  position?: string
  department?: string
  entity_id: string
  nafath_id: string
  national_id: string
}

export const createGovernmentOfficialWorkflow = createWorkflow(
  'create-government-official',
  function (input: CreateGovernmentOfficialInput) {
    const validation = validateNafathIdentityStep({
      nafath_id: input.nafath_id,
      national_id: input.national_id
    })

    return new WorkflowResponse({
      official: {
        name: input.name,
        email: input.email,
        phone: input.phone,
        position: input.position,
        department: input.department,
        entity_id: input.entity_id,
        nafath_id: input.nafath_id,
        is_active: true
      },
      validation_result: validation
    })
  }
)
