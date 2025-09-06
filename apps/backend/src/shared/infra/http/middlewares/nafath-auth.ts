import { NextFunction, Request, Response } from 'express'
import { MedusaError } from '@medusajs/framework/utils'

export interface NafathTokenPayload {
  sub: string
  national_id: string
  name: string
  email?: string
  phone?: string
  iat: number
  exp: number
}

export const nafathAuth = (options: { required?: boolean } = {}) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const nafathToken = req.headers['x-nafath-token'] as string

      if (!nafathToken) {
        if (options.required) {
          throw new MedusaError(
            MedusaError.Types.UNAUTHORIZED,
            'Nafath authentication required'
          )
        }
        return next()
      }

      const payload = await validateNafathToken(nafathToken)
      
      req.nafath = payload
      next()
    } catch (error) {
      if (options.required) {
        throw error
      }
      next()
    }
  }
}

async function validateNafathToken(token: string): Promise<NafathTokenPayload> {
  try {
    const response = await fetch(`${process.env.NAFATH_VALIDATION_URL}/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NAFATH_API_KEY}`
      },
      body: JSON.stringify({ token })
    })

    if (!response.ok) {
      throw new Error('Invalid Nafath token')
    }

    const payload = await response.json()
    return payload
  } catch {
    throw new MedusaError(
      MedusaError.Types.UNAUTHORIZED,
      'Invalid Nafath authentication token'
    )
  }
}

declare module 'express-serve-static-core' {
  interface Request {
    nafath?: NafathTokenPayload
  }
}
