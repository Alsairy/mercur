import { Module } from "@medusajs/framework/utils";
import GovernmentModuleService from "./service";

export const GOVERNMENT_MODULE = "government";

export default Module(GOVERNMENT_MODULE, {
  service: GovernmentModuleService,
});

export * from "./models";
