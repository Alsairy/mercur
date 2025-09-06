export interface GovernmentAPIResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T = unknown> extends GovernmentAPIResponse<T[]> {
  pagination: {
    total: number
    page: number
    limit: number
    pages: number
  }
}

export interface NafathAuthRequest {
  nafath_token: string
  national_id: string
}

export interface NafathAuthResponse {
  success: boolean
  official?: Record<string, unknown>
  nafath_data?: Record<string, unknown>
  error?: string
}
