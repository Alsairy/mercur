import { createStep, StepResponse } from '@medusajs/workflows-sdk'
import { MedusaError } from '@medusajs/framework/utils'

type SyncWithSobolPlatformInput = {
  integration_id: string
  data_type: 'CAREER_GUIDANCE' | 'TRAINING_PROGRAM' | 'CERTIFICATION'
  payload: Record<string, unknown>
}

export const syncWithSobolPlatformStep = createStep(
  'sync-with-sobol-platform',
  async (input: SyncWithSobolPlatformInput) => {
    try {
      const response = await fetch(`${process.env.SOBOL_API_URL}/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SOBOL_API_KEY || ''}`,
          'X-Nafath-Token': process.env.NAFATH_TOKEN || ''
        },
        body: JSON.stringify({
          type: input.data_type,
          data: input.payload,
          timestamp: new Date().toISOString()
        })
      })

      if (!response.ok) {
        throw new Error(`Sobol Platform sync failed: ${response.statusText}`)
      }

      const result = await response.json()
      return new StepResponse(result, { integration_id: input.integration_id })
    } catch (error) {
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        `Sobol Platform integration failed: ${(error as Error).message}`
      )
    }
  },
  async () => {
    return new StepResponse(void 0)
  }
)
