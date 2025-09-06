import { model } from '@medusajs/framework/utils'

export const Quotation = model.define('quotation', {
  id: model.id({ prefix: 'quot' }).primaryKey(),
  request_id: model.text(),
  service_provider_id: model.text(),
  quoted_amount: model.number(),
  currency_code: model.text().default('SAR'),
  delivery_timeline: model.text(),
  proposal_details: model.json(),
  attachments: model.json().nullable(),
  status: model.enum(['draft', 'submitted', 'selected', 'rejected', 'withdrawn']).default('draft'),
  submitted_at: model.dateTime().nullable(),
  evaluation_score: model.number().nullable(),
  evaluation_notes: model.text().nullable(),
  government_approved: model.boolean().default(false)
})
