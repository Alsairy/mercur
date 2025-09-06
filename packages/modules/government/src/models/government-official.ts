import { model } from "@medusajs/framework/utils";
import { GovernmentEntity } from "./government-entity";

export const GovernmentOfficial = model.define("government_official", {
  id: model.id({ prefix: "govoff" }).primaryKey(),
  name: model.text().searchable(),
  email: model.text(),
  phone: model.text().nullable(),
  position: model.text().nullable(),
  department: model.text().nullable(),
  authority_scope: model.json().nullable(),
  nafath_id: model.text().unique().nullable(),
  is_active: model.boolean().default(true),
  entity: model.belongsTo(() => GovernmentEntity),
});
