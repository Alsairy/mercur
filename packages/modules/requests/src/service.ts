import { MedusaService } from "@medusajs/framework/utils";

import { Request, Quotation } from "./models";

class RequestsModuleService extends MedusaService({
  Request,
  Quotation,
}) {}

export default RequestsModuleService;
