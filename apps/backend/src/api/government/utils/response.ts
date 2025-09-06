import { MedusaResponse } from '@medusajs/framework'

export function successResponse(res: MedusaResponse, data: unknown, message?: string) {
  return res.json({
    success: true,
    message,
    data
  })
}

export function errorResponse(res: MedusaResponse, error: string, statusCode = 400) {
  return res.status(statusCode).json({
    success: false,
    error
  })
}

export function paginatedResponse(res: MedusaResponse, data: unknown[], count: number, page = 1, limit = 20) {
  return res.json({
    success: true,
    data,
    pagination: {
      total: count,
      page,
      limit,
      pages: Math.ceil(count / limit)
    }
  })
}
