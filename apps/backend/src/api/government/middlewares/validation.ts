import { MedusaRequest, MedusaResponse, MedusaNextFunction } from '@medusajs/framework'
import { z } from 'zod'

export function validateBody(schema: z.ZodSchema) {
  return (req: MedusaRequest, res: MedusaResponse, next: MedusaNextFunction) => {
    try {
      const validatedData = schema.parse(req.body)
      req.body = validatedData
      next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation failed',
          details: error.errors
        })
      }
      next(error)
    }
  }
}

export function validateQuery(schema: z.ZodSchema) {
  return (req: MedusaRequest, res: MedusaResponse, next: MedusaNextFunction) => {
    try {
      const validatedData = schema.parse(req.query)
      req.query = validatedData
      next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation failed',
          details: error.errors
        })
      }
      next(error)
    }
  }
}
