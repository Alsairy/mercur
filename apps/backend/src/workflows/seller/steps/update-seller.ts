import { toHandle } from '@medusajs/framework/utils'
import { Modules } from '@medusajs/framework/utils'
import { StepResponse, createStep } from '@medusajs/framework/workflows-sdk'

import { SellerDTO, SellerEvents, UpdateSellerDTO } from '@mercurjs/framework'
import { SELLER_MODULE, SellerModuleService } from '@mercurjs/seller'

export const updateSellerStep = createStep(
  'update-seller',
  async (input: UpdateSellerDTO, { container }) => {
    const service = container.resolve<SellerModuleService>(SELLER_MODULE)
    const eventBus = container.resolve(Modules.EVENT_BUS)

    const [previousData] = await service.listSellers({
      id: input.id
    })

    const newHandle = input.name ? toHandle(input.name) : undefined

    const normalizedInput = {
      ...input,
      ...(newHandle ? { handle: newHandle } : {}),
      service_categories: input.service_categories && Array.isArray(input.service_categories)
        ? input.service_categories.reduce((acc: Record<string, unknown>, category: string) => {
            acc[category] = true;
            return acc;
          }, {})
        : input.service_categories
    }

    const updatedSellers: SellerDTO = await service.updateSellers(normalizedInput)

    if (input.store_status) {
      await eventBus.emit({
        name: SellerEvents.STORE_STATUS_CHANGED,
        data: {
          id: input.id,
          store_status: input.store_status
        }
      })
    }

    return new StepResponse(updatedSellers, previousData as UpdateSellerDTO)
  },
  async (previousData: UpdateSellerDTO, { container }) => {
    const service = container.resolve<SellerModuleService>(SELLER_MODULE)

    const normalizedPreviousData = {
      ...previousData,
      service_categories: previousData.service_categories && Array.isArray(previousData.service_categories)
        ? previousData.service_categories.reduce((acc: Record<string, unknown>, category: string) => {
            acc[category] = true;
            return acc;
          }, {})
        : previousData.service_categories
    }

    await service.updateSellers(normalizedPreviousData)
  }
)
