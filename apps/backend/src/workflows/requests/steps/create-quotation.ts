import { StepResponse, createStep } from '@medusajs/framework/workflows-sdk'
import { CreateQuotationDTO } from '@mercurjs/framework'

import { REQUESTS_MODULE, RequestsModuleService } from '@mercurjs/requests'

export const createQuotationStep = createStep(
  'create-quotation',
  async (input: CreateQuotationDTO | CreateQuotationDTO[], { container }) => {
    const service = container.resolve<RequestsModuleService>(REQUESTS_MODULE)

    const toCreate = Array.isArray(input) ? input : [input]

    const quotations = await service.createQuotations(toCreate)

    return new StepResponse(quotations)
  }
)
