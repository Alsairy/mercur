import { AuthenticatedMedusaRequest, MedusaResponse } from '@medusajs/framework'

import { REQUESTS_MODULE, RequestsModuleService } from '@mercurjs/requests'
import { fetchSellerByAuthActorId } from '../../../shared/infra/http/utils'
import { submitQuotationWorkflow } from '../../../workflows/requests/workflows/submit-quotation'

export const POST = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const seller = await fetchSellerByAuthActorId(
    req.auth_context.actor_id,
    req.scope
  )

  const { result } = await submitQuotationWorkflow.run({
    input: {
      service_provider_id: seller.id,
      ...(req.validatedBody || {})
    },
    container: req.scope
  })

  res.status(201).json({ 
    success: true,
    quotation: result[0],
    message: 'Quotation submitted successfully'
  })
}

export const GET = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const seller = await fetchSellerByAuthActorId(
    req.auth_context.actor_id,
    req.scope
  )

  const requestsService = req.scope.resolve<RequestsModuleService>(REQUESTS_MODULE)

  try {
    const quotations = await requestsService.listQuotations({
      service_provider_id: seller.id
    })

    res.json({
      success: true,
      quotations
    })
  } catch {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve quotations'
    })
  }
}
