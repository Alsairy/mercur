import { z } from 'zod'

export const CreateGovernmentEntitySchema = z.object({
  name: z.string().min(1),
  name_ar: z.string().min(1),
  entity_type: z.enum(['MOE', 'ETEC', 'MUNICIPALITY', 'SDAIA', 'OTHER']),
  authority_level: z.enum(['NATIONAL', 'REGIONAL', 'LOCAL']),
  contact_email: z.string().email().optional(),
  contact_phone: z.string().optional(),
  integration_config: z.record(z.unknown()).optional(),
  is_active: z.boolean().default(true)
})

export const UpdateGovernmentEntitySchema = CreateGovernmentEntitySchema.partial()

export const CreateGovernmentOfficialSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  position: z.string().optional(),
  department: z.string().optional(),
  authority_scope: z.record(z.unknown()).optional(),
  nafath_id: z.string().optional(),
  entity_id: z.string(),
  is_active: z.boolean().default(true)
})

export const UpdateGovernmentOfficialSchema = CreateGovernmentOfficialSchema.partial().omit({ entity_id: true })

export const NafathAuthSchema = z.object({
  nafath_token: z.string(),
  national_id: z.string()
})

export const ServiceRequestSchema = z.object({
  type: z.string(),
  data: z.record(z.unknown()),
  submitter_id: z.string(),
  service_category: z.enum(['construction', 'furnishing', 'transportation', 'staffing', 'training', 'legal_consulting', 'curriculum_support', 'maintenance']).optional(),
  government_approver_type: z.enum(['MOE', 'ETEC', 'MUNICIPALITY']).optional()
})

export const ApproveRequestSchema = z.object({
  notes: z.string().optional()
})
