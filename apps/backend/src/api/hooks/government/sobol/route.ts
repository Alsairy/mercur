import { MedusaRequest, MedusaResponse } from '@medusajs/framework'
import { Modules } from '@medusajs/framework/utils'

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const eventBus = req.scope.resolve(Modules.EVENT_BUS)

  await eventBus.emit(
    {
      name: 'government.sobol.webhook.received',
      data: {
        data: req.body,
        rawData: req.rawBody,
        headers: req.headers
      }
    },
    {
      delay: 1000,
      attempts: 3
    }
  )

  res.sendStatus(200)
}
