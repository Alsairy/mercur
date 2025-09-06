import { MedusaRequest, MedusaResponse } from '@medusajs/framework'

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const requestsService = req.scope.resolve('requests')
  const sellerService = req.scope.resolve('seller')
  
  const pendingRequests = await requestsService.listAndCountRequests({
    status: 'pending',
    requires_government_approval: true
  })
  
  const recentSellers = await sellerService.listAndCountSellers({
    created_at: {
      gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    }
  })
  
  res.json({
    pending_requests: pendingRequests[0],
    recent_sellers: recentSellers[0],
    summary: {
      total_pending: pendingRequests[1],
      total_new_sellers: recentSellers[1]
    }
  })
}
