import { model } from "@medusajs/framework/utils";

export const GovernmentIntegration = model.define("government_integration", {
  id: model.id({ prefix: "gint" }).primaryKey(),
  entity_id: model.text(),
  system_type: model.enum(['NOOR', 'SOBOL', 'NAFATH', 'OTHER']),
  api_endpoint: model.text(),
  authentication_config: model.json(),
  data_mapping_config: model.json(),
  webhook_url: model.text().nullable(),
  sync_frequency: model.enum(['REAL_TIME', 'HOURLY', 'DAILY', 'MANUAL']).default('MANUAL'),
  last_sync_at: model.dateTime().nullable(),
  is_active: model.boolean().default(true),
  status: model.enum(['CONNECTED', 'DISCONNECTED', 'ERROR', 'PENDING']).default('PENDING')
});
