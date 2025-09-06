import { model } from '@medusajs/framework/utils'

import { Seller } from './seller'

export const SellerOnboarding = model.define('seller_onboarding', {
  id: model.id({ prefix: 'sel_onb' }).primaryKey(),
  store_information: model.boolean().default(false),
  stripe_connection: model.boolean().default(false),
  locations_shipping: model.boolean().default(false),
  products: model.boolean().default(false),
  education_license_verification: model.boolean().default(false),
  service_provider_certification: model.boolean().default(false),
  government_approval_status: model.enum(['pending', 'approved', 'rejected', 'not_required']).default('not_required'),
  background_check: model.boolean().default(false),
  insurance_verification: model.boolean().default(false),
  portfolio_submission: model.boolean().default(false),
  seller: model.belongsTo(() => Seller, { mappedBy: 'onboarding' })
})
