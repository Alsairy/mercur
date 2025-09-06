export interface CreateGovernmentIntegrationDTO {
  entity_id: string
  system_type: 'NOOR' | 'SOBOL' | 'NAFATH' | 'OTHER'
  api_endpoint: string
  authentication_config: Record<string, unknown>
  data_mapping_config: Record<string, unknown>
  webhook_url?: string
  sync_frequency?: 'REAL_TIME' | 'HOURLY' | 'DAILY' | 'MANUAL'
  is_active?: boolean
}

export interface UpdateGovernmentIntegrationDTO {
  id: string
  entity_id?: string
  system_type?: 'NOOR' | 'SOBOL' | 'NAFATH' | 'OTHER'
  api_endpoint?: string
  authentication_config?: Record<string, unknown>
  data_mapping_config?: Record<string, unknown>
  webhook_url?: string
  sync_frequency?: 'REAL_TIME' | 'HOURLY' | 'DAILY' | 'MANUAL'
  is_active?: boolean
  status?: 'CONNECTED' | 'DISCONNECTED' | 'ERROR' | 'PENDING'
}

export interface FilterableGovernmentIntegrationProps {
  id?: string | string[]
  entity_id?: string | string[]
  system_type?: 'NOOR' | 'SOBOL' | 'NAFATH' | 'OTHER'
  status?: 'CONNECTED' | 'DISCONNECTED' | 'ERROR' | 'PENDING'
  is_active?: boolean
  created_at?: Record<string, unknown>
  updated_at?: Record<string, unknown>
}

export interface CreateIntegrationLogDTO {
  integration_id: string
  operation_type: 'SYNC' | 'WEBHOOK' | 'AUTH' | 'ERROR'
  request_data?: Record<string, unknown>
  response_data?: Record<string, unknown>
  status: 'SUCCESS' | 'FAILED' | 'PENDING'
  error_message?: string
  execution_time_ms?: number
}

export interface UpdateIntegrationLogDTO {
  id: string
  response_data?: Record<string, unknown>
  status?: 'SUCCESS' | 'FAILED' | 'PENDING'
  error_message?: string
  execution_time_ms?: number
}

export interface GovernmentIntegrationEvents {
  CREATED: 'government.integration.created'
  UPDATED: 'government.integration.updated'
  SYNC_STARTED: 'government.integration.sync.started'
  SYNC_COMPLETED: 'government.integration.sync.completed'
  SYNC_FAILED: 'government.integration.sync.failed'
  WEBHOOK_RECEIVED: 'government.integration.webhook.received'
}

export const GovernmentIntegrationEvents: GovernmentIntegrationEvents = {
  CREATED: 'government.integration.created',
  UPDATED: 'government.integration.updated',
  SYNC_STARTED: 'government.integration.sync.started',
  SYNC_COMPLETED: 'government.integration.sync.completed',
  SYNC_FAILED: 'government.integration.sync.failed',
  WEBHOOK_RECEIVED: 'government.integration.webhook.received'
}
