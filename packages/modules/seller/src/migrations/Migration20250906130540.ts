import { Migration } from '@mikro-orm/migrations';

export class Migration20250906130540 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "seller_onboarding" add column if not exists "education_license_verification" boolean not null default false;`);
    this.addSql(`alter table if exists "seller_onboarding" add column if not exists "service_provider_certification" boolean not null default false;`);
    this.addSql(`alter table if exists "seller_onboarding" add column if not exists "background_check" boolean not null default false;`);
    this.addSql(`alter table if exists "seller_onboarding" add column if not exists "insurance_verification" boolean not null default false;`);
    this.addSql(`alter table if exists "seller_onboarding" add column if not exists "portfolio_submission" boolean not null default false;`);
    this.addSql(`alter table if exists "seller_onboarding" add column if not exists "government_approval_status" text check ("government_approval_status" in ('not_required', 'pending', 'approved', 'rejected')) not null default 'not_required';`);
    
    this.addSql(`create index if not exists "idx_seller_onboarding_government_approval_status" on "seller_onboarding" ("government_approval_status");`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop index if exists "idx_seller_onboarding_government_approval_status";`);
    this.addSql(`alter table if exists "seller_onboarding" drop column if exists "government_approval_status";`);
    this.addSql(`alter table if exists "seller_onboarding" drop column if exists "portfolio_submission";`);
    this.addSql(`alter table if exists "seller_onboarding" drop column if exists "insurance_verification";`);
    this.addSql(`alter table if exists "seller_onboarding" drop column if exists "background_check";`);
    this.addSql(`alter table if exists "seller_onboarding" drop column if exists "service_provider_certification";`);
    this.addSql(`alter table if exists "seller_onboarding" drop column if exists "education_license_verification";`);
  }

}
