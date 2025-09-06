import { GovernmentEntityType, AuthorityLevel } from './common'

export interface CreateGovernmentEntityDTO {
  name: string
  name_ar: string
  entity_type: GovernmentEntityType
  authority_level: AuthorityLevel
  contact_email?: string
  contact_phone?: string
  integration_config?: Record<string, unknown>
  is_active?: boolean
}

export interface UpdateGovernmentEntityDTO {
  id: string
  name?: string
  name_ar?: string
  entity_type?: GovernmentEntityType
  authority_level?: AuthorityLevel
  contact_email?: string
  contact_phone?: string
  integration_config?: Record<string, unknown>
  is_active?: boolean
}

export interface CreateGovernmentOfficialDTO {
  name: string
  email: string
  phone?: string
  position?: string
  department?: string
  authority_scope?: Record<string, unknown>
  nafath_id?: string
  entity_id: string
  is_active?: boolean
}

export interface UpdateGovernmentOfficialDTO {
  id: string
  name?: string
  email?: string
  phone?: string
  position?: string
  department?: string
  authority_scope?: Record<string, unknown>
  nafath_id?: string
  is_active?: boolean
}
