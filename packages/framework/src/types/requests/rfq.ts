export interface CreateRFQDTO {
  submitter_id: string
  type: 'rfq'
  service_category: string
  data: {
    title: string
    description: string
    requirements: any
    budget_range?: {
      min: number
      max: number
      currency: string
    }
    deadline: string
    evaluation_criteria: any
    location?: string
    contact_info?: any
  }
  requires_government_approval?: boolean
  government_approver_type?: 'MOE' | 'ETEC' | 'MUNICIPALITY'
}

export interface RFQEvents {
  CREATED: 'rfq.created'
  UPDATED: 'rfq.updated'
  PUBLISHED: 'rfq.published'
  CLOSED: 'rfq.closed'
  AWARDED: 'rfq.awarded'
}

export const RFQEvents: RFQEvents = {
  CREATED: 'rfq.created',
  UPDATED: 'rfq.updated',
  PUBLISHED: 'rfq.published',
  CLOSED: 'rfq.closed',
  AWARDED: 'rfq.awarded'
}
