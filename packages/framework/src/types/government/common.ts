export enum GovernmentEntityType {
  MOE = "MOE",
  ETEC = "ETEC", 
  MUNICIPALITY = "MUNICIPALITY",
  SDAIA = "SDAIA",
  OTHER = "OTHER"
}

export enum AuthorityLevel {
  NATIONAL = "NATIONAL",
  REGIONAL = "REGIONAL", 
  LOCAL = "LOCAL"
}

export type GovernmentEntityDTO = {
  id: string
  created_at: Date
  updated_at: Date
  name: string
  name_ar: string
  entity_type: GovernmentEntityType
  authority_level: AuthorityLevel
  contact_email: string | null
  contact_phone: string | null
  integration_config: Record<string, unknown> | null
  is_active: boolean
}

export type GovernmentOfficialDTO = {
  id: string
  created_at: Date
  updated_at: Date
  name: string
  email: string
  phone: string | null
  position: string | null
  department: string | null
  authority_scope: Record<string, unknown> | null
  nafath_id: string | null
  is_active: boolean
  entity?: Partial<GovernmentEntityDTO>
}
