import { toHandle } from '@medusajs/framework/utils'
import { StepResponse, createStep } from '@medusajs/framework/workflows-sdk'

import { CreateSellerDTO, SellerDTO } from '@mercurjs/framework'
import { SELLER_MODULE, SellerModuleService } from '@mercurjs/seller'

export const createSellerStep = createStep(
  'create-seller',
  async (input: CreateSellerDTO, { container }) => {
    const service = container.resolve<SellerModuleService>(SELLER_MODULE)

    const normalizedInput = {
      ...input,
      handle: toHandle(input.name),
      service_categories: input.service_categories && Array.isArray(input.service_categories)
        ? input.service_categories.reduce((acc: Record<string, unknown>, category: string) => {
            acc[category] = true;
            return acc;
          }, {})
        : input.service_categories
    }

    const seller: SellerDTO = await service.createSellers(normalizedInput)

    return new StepResponse(seller, seller.id)
  },
  async (id: string, { container }) => {
    if (!id) {
      return
    }

    const service = container.resolve<SellerModuleService>(SELLER_MODULE)

    await service.deleteSellers([id])
  }
)
