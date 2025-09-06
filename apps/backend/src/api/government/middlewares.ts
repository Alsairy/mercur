import { MiddlewareRoute, authenticate } from '@medusajs/framework'
import { nafathAuth } from '../../shared/infra/http/middlewares/nafath-auth'

export const governmentMiddlewares: MiddlewareRoute[] = [
  {
    matcher: '/government/*',
    middlewares: [
      nafathAuth({ required: true }),
      authenticate('government', ['bearer', 'session'], {
        allowUnregistered: false
      })
    ]
  }
]
