import { StepResponse, createStep } from '@medusajs/framework/workflows-sdk'
import { UpdateQuotationDTO } from '@mercurjs/framework'

import { REQUESTS_MODULE, RequestsModuleService } from '@mercurjs/requests'

export const updateQuotationStep = createStep(
  'update-quotation',
  async (input: UpdateQuotationDTO, { container }) => {
    const service = container.resolve<RequestsModuleService>(REQUESTS_MODULE)

    const quotation = await service.updateQuotations(input)

    return new StepResponse(quotation[0], quotation[0].id)
  }
)
