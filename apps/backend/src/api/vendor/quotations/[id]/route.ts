import { AuthenticatedMedusaRequest, MedusaResponse } from '@medusajs/framework'

import { REQUESTS_MODULE, RequestsModuleService } from '@mercurjs/requests'
import { fetchSellerByAuthActorId } from '../../../../shared/infra/http/utils'

export const GET = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const seller = await fetchSellerByAuthActorId(
    req.auth_context.actor_id,
    req.scope
  )

  const quotationId = req.params.id
  const requestsService = req.scope.resolve<RequestsModuleService>(REQUESTS_MODULE)

  try {
    const quotation = await requestsService.retrieveQuotation(quotationId)

    if (quotation.service_provider_id !== seller.id) {
      return res.status(403).json({
        success: false,
        error: 'Access denied to this quotation'
      })
    }

    res.json({
      success: true,
      quotation
    })
  } catch {
    res.status(404).json({
      success: false,
      error: 'Quotation not found'
    })
  }
}

export const PUT = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const seller = await fetchSellerByAuthActorId(
    req.auth_context.actor_id,
    req.scope
  )

  const quotationId = req.params.id
  const requestsService = req.scope.resolve<RequestsModuleService>(REQUESTS_MODULE)

  try {
    const existingQuotation = await requestsService.retrieveQuotation(quotationId)

    if (existingQuotation.service_provider_id !== seller.id) {
      return res.status(403).json({
        success: false,
        error: 'Access denied to this quotation'
      })
    }

    if (existingQuotation.status !== 'draft') {
      return res.status(400).json({
        success: false,
        error: 'Cannot modify submitted quotation'
      })
    }

    const updatedQuotation = await requestsService.updateQuotations({
      id: quotationId,
      ...(req.validatedBody || {})
    })

    res.json({
      success: true,
      quotation: updatedQuotation[0],
      message: 'Quotation updated successfully'
    })
  } catch {
    res.status(404).json({
      success: false,
      error: 'Quotation not found'
    })
  }
}
