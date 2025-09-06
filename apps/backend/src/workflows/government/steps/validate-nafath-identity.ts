import { createStep, StepResponse } from '@medusajs/workflows-sdk'
import { MedusaError } from '@medusajs/framework/utils'

type ValidateNafathIdentityInput = {
  nafath_id: string
  national_id: string
}

export const validateNafathIdentityStep = createStep(
  'validate-nafath-identity',
  async (input: ValidateNafathIdentityInput) => {
    try {
      const response = await fetch(`${process.env.NAFATH_API_URL}/identity/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NAFATH_API_KEY}`
        },
        body: JSON.stringify({
          nafath_id: input.nafath_id,
          national_id: input.national_id
        })
      })

      if (!response.ok) {
        throw new Error('Nafath identity validation failed')
      }

      const result = await response.json()
      
      return new StepResponse(result, {
        nafath_id: input.nafath_id,
        validation_result: result
      })
    } catch (error) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `Nafath identity validation failed: ${(error as Error).message}`
      )
    }
  },
  async () => {
    return new StepResponse(void 0)
  }
)
