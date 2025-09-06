import { Migration } from '@mikro-orm/migrations';

export class Migration20250906150000 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table if not exists "government_integration" ("id" text not null, "entity_id" text not null, "system_type" text check ("system_type" in (\'NOOR\', \'SOBOL\', \'NAFATH\', \'OTHER\')) not null, "api_endpoint" text not null, "authentication_config" jsonb not null, "data_mapping_config" jsonb not null, "webhook_url" text null, "sync_frequency" text check ("sync_frequency" in (\'REAL_TIME\', \'HOURLY\', \'DAILY\', \'MANUAL\')) not null default \'MANUAL\', "last_sync_at" timestamptz null, "is_active" boolean not null default true, "status" text check ("status" in (\'CONNECTED\', \'DISCONNECTED\', \'ERROR\', \'PENDING\')) not null default \'PENDING\', "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "government_integration_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_government_integration_deleted_at" on "government_integration" ("deleted_at");');

    this.addSql('create table if not exists "integration_log" ("id" text not null, "integration_id" text not null, "operation_type" text check ("operation_type" in (\'SYNC\', \'WEBHOOK\', \'AUTH\', \'ERROR\')) not null, "request_data" jsonb null, "response_data" jsonb null, "status" text check ("status" in (\'SUCCESS\', \'FAILED\', \'PENDING\')) not null, "error_message" text null, "execution_time_ms" numeric null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "integration_log_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_integration_log_deleted_at" on "integration_log" ("deleted_at");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "government_integration" cascade;');
    this.addSql('drop table if exists "integration_log" cascade;');
  }

}
