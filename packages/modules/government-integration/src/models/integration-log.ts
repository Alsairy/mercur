import { model } from "@medusajs/framework/utils";

export const IntegrationLog = model.define("integration_log", {
  id: model.id({ prefix: "ilog" }).primaryKey(),
  integration_id: model.text(),
  operation_type: model.enum(['SYNC', 'WEBHOOK', 'AUTH', 'ERROR']),
  request_data: model.json().nullable(),
  response_data: model.json().nullable(),
  status: model.enum(['SUCCESS', 'FAILED', 'PENDING']),
  error_message: model.text().nullable(),
  execution_time_ms: model.number().nullable()
});
