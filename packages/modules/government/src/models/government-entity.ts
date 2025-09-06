import { model } from "@medusajs/framework/utils";

export const GovernmentEntity = model.define("government_entity", {
  id: model.id({ prefix: "gov" }).primaryKey(),
  name: model.text().searchable(),
  name_ar: model.text().searchable(),
  entity_type: model.enum(['MOE', 'ETEC', 'MUNICIPALITY', 'SDAIA', 'OTHER']),
  authority_level: model.enum(['NATIONAL', 'REGIONAL', 'LOCAL']),
  contact_email: model.text().nullable(),
  contact_phone: model.text().nullable(),
  integration_config: model.json().nullable(),
  is_active: model.boolean().default(true),
});
