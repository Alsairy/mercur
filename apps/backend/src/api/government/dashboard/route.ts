import { MedusaRequest, MedusaResponse } from '@medusajs/framework'

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const requestsService = req.scope.resolve('requests')
  const sellerService = req.scope.resolve('seller')
  
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  
  const [
    pendingRequests,
    recentSellers,
    educationSellers,
    governmentRequests
  ] = await Promise.all([
    requestsService.listAndCountRequests({
      status: 'pending'
    }),
    sellerService.listAndCountSellers({
      created_at: { gte: thirtyDaysAgo }
    }),
    sellerService.listAndCountSellers({
      education_license_number: { $ne: null }
    }),
    requestsService.listAndCountRequests({
      requires_government_approval: true,
      status: 'pending'
    })
  ])
  
  res.json({
    dashboard: {
      pending_requests: pendingRequests[1],
      recent_sellers: recentSellers[1],
      education_sellers: educationSellers[1],
      government_requests: governmentRequests[1],
      requests_by_category: governmentRequests[0].reduce((acc, req) => {
        const category = req.service_category || 'other'
        acc[category] = (acc[category] || 0) + 1
        return acc
      }, {}),
      recent_activity: [
        ...pendingRequests[0].slice(0, 5),
        ...recentSellers[0].slice(0, 5)
      ]
    }
  })
}
