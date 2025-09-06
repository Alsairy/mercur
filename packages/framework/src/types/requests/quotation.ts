export interface CreateQuotationDTO {
  request_id: string
  service_provider_id: string
  quoted_amount: number
  currency_code?: string
  delivery_timeline: string
  proposal_details?: Record<string, unknown>
  attachments?: Record<string, unknown>
  status?: 'draft' | 'submitted' | 'selected' | 'rejected' | 'withdrawn'
}

export interface UpdateQuotationDTO {
  id: string
  quoted_amount?: number
  delivery_timeline?: string
  proposal_details?: Record<string, unknown>
  attachments?: Record<string, unknown>
  status?: 'draft' | 'submitted' | 'selected' | 'rejected' | 'withdrawn'
  evaluation_score?: number
  evaluation_notes?: string
  government_approved?: boolean
}

export interface FilterableQuotationProps {
  id?: string | string[]
  request_id?: string | string[]
  service_provider_id?: string | string[]
  status?: 'draft' | 'submitted' | 'selected' | 'rejected' | 'withdrawn'
  government_approved?: boolean
  created_at?: Record<string, unknown>
  updated_at?: Record<string, unknown>
}

export interface QuotationEvents {
  CREATED: 'quotation.created'
  UPDATED: 'quotation.updated'
  SUBMITTED: 'quotation.submitted'
  SELECTED: 'quotation.selected'
  REJECTED: 'quotation.rejected'
  WITHDRAWN: 'quotation.withdrawn'
}

export const QuotationEvents: QuotationEvents = {
  CREATED: 'quotation.created',
  UPDATED: 'quotation.updated',
  SUBMITTED: 'quotation.submitted',
  SELECTED: 'quotation.selected',
  REJECTED: 'quotation.rejected',
  WITHDRAWN: 'quotation.withdrawn'
}
