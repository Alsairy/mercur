import { Migration } from '@mikro-orm/migrations';

export class Migration20250906140000 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "quotation" ("id" varchar not null, "request_id" varchar not null, "service_provider_id" varchar not null, "quoted_amount" numeric not null, "currency_code" varchar not null default 'SAR', "delivery_timeline" varchar not null, "proposal_details" jsonb, "attachments" jsonb, "status" text check ("status" in ('draft', 'submitted', 'selected', 'rejected', 'withdrawn')) not null default 'draft', "submitted_at" timestamptz, "evaluation_score" numeric, "evaluation_notes" varchar, "government_approved" boolean not null default false, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), constraint "quotation_pkey" primary key ("id"));`);
    
    this.addSql(`create index if not exists "idx_quotation_request_id" on "quotation" ("request_id");`);
    this.addSql(`create index if not exists "idx_quotation_service_provider_id" on "quotation" ("service_provider_id");`);
    this.addSql(`create index if not exists "idx_quotation_status" on "quotation" ("status");`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "quotation" cascade;`);
  }

}
