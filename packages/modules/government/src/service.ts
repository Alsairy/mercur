import { MedusaService } from "@medusajs/framework/utils";

import { GovernmentEntity, GovernmentOfficial } from "./models";

class GovernmentModuleService extends MedusaService({
  GovernmentEntity,
  GovernmentOfficial,
}) {}

export default GovernmentModuleService;
