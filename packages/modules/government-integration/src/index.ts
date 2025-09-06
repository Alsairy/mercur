import { Module } from "@medusajs/framework/utils"
import GovernmentIntegrationService from "./service"

export const GOVERNMENT_INTEGRATION_MODULE = "government-integration"

export default Module(GOVERNMENT_INTEGRATION_MODULE, {
  service: GovernmentIntegrationService,
})

export * from "./service"
export * from "./models"
