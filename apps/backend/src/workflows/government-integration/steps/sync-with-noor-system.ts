import { createStep, StepResponse } from '@medusajs/workflows-sdk'
import { MedusaError } from '@medusajs/framework/utils'

type SyncWithNoorSystemInput = {
  integration_id: string
  data_type: 'SCHOOL_REGISTRATION' | 'SERVICE_REQUEST' | 'APPROVAL_STATUS'
  payload: Record<string, unknown>
}

export const syncWithNoorSystemStep = createStep(
  'sync-with-noor-system',
  async (input: SyncWithNoorSystemInput) => {
    try {
      const response = await fetch(`${process.env.NOOR_API_URL}/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NOOR_API_KEY || ''}`,
          'X-Nafath-Token': process.env.NAFATH_TOKEN || ''
        },
        body: JSON.stringify({
          type: input.data_type,
          data: input.payload,
          timestamp: new Date().toISOString()
        })
      })

      if (!response.ok) {
        throw new Error(`Noor System sync failed: ${response.statusText}`)
      }

      const result = await response.json()
      return new StepResponse(result, { integration_id: input.integration_id })
    } catch (error) {
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        `Noor System integration failed: ${(error as Error).message}`
      )
    }
  },
  async () => {
    return new StepResponse(void 0)
  }
)
