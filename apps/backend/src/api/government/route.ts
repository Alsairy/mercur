import { MedusaRequest, MedusaResponse } from '@medusajs/framework'

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  res.json({
    message: 'Government API is active',
    version: '1.0.0',
    endpoints: {
      entities: '/government/entities',
      officials: '/government/officials',
      requests: '/government/requests',
      dashboard: '/government/dashboard',
      oversight: '/government/oversight',
      auth: '/government/auth/nafath'
    }
  })
}
