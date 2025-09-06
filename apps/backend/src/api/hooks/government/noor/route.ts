import { MedusaRequest, MedusaResponse } from '@medusajs/framework'
import { Modules } from '@medusajs/framework/utils'
import { createHmac, timingSafeEqual, createHash } from 'node:crypto'

type RawMedusaRequest = MedusaRequest & { rawBody?: Buffer }

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const eventBus = req.scope.resolve(Modules.EVENT_BUS)

  const raw = (req as RawMedusaRequest).rawBody
  const bodyBuf = raw ?? Buffer.from(JSON.stringify(req.body ?? {}))

  const signature = (req.headers['x-noor-signature'] as string) || ''
  const secret = process.env.NOOR_API_KEY || ''
  if (!secret) {
    return res.status(500).json({ message: 'NOOR_API_KEY not configured' })
  }
  const expected = createHmac('sha256', secret).update(bodyBuf).digest('hex')
  const valid =
    signature.length === expected.length &&
    timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  if (!valid) {
    return res.status(401).json({ message: 'invalid signature' })
  }

  const eventId =
    (req.headers['x-noor-event-id'] as string) ||
    createHash('sha256').update(bodyBuf).digest('hex')

  const { authorization, cookie, 'set-cookie': _sc, ...safeHeaders } = req.headers as any

  await eventBus.emit(
    {
      name: 'government.noor.webhook.received',
      data: {
        id: eventId,
        data: req.body,
        rawData: bodyBuf,
        headers: safeHeaders
      }
    },
    {
      delay: 1000,
      attempts: 3
    }
  )

  res.sendStatus(202)
}
