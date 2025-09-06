import { MedusaService } from "@medusajs/framework/utils";

import { GovernmentIntegration, IntegrationLog } from "./models";

class GovernmentIntegrationService extends MedusaService({
  GovernmentIntegration,
  IntegrationLog,
}) {
  async syncWithNoorSystem(data: any) {
    const log = await this.createIntegrationLogs([{
      integration_id: 'noor-system',
      operation_type: 'SYNC',
      request_data: data,
      status: 'SUCCESS'
    }])
    
    return { success: true, log: log[0] }
  }
  
  async syncWithSobolPlatform(data: any) {
    const log = await this.createIntegrationLogs([{
      integration_id: 'sobol-platform',
      operation_type: 'SYNC',
      request_data: data,
      status: 'SUCCESS'
    }])
    
    return { success: true, log: log[0] }
  }
  
  async handleWebhook(systemType: string, payload: any) {
    const log = await this.createIntegrationLogs([{
      integration_id: `${systemType.toLowerCase()}-webhook`,
      operation_type: 'WEBHOOK',
      request_data: payload,
      status: 'SUCCESS'
    }])
    
    return { success: true, log: log[0] }
  }
}

export default GovernmentIntegrationService;
