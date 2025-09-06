import { Migration } from '@mikro-orm/migrations';

export class Migration20250906120000 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "government_entity" ("id" varchar(255) not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, "name" text not null, "name_ar" text not null, "entity_type" text check ("entity_type" in (\'MOE\', \'ETEC\', \'MUNICIPALITY\', \'SDAIA\', \'OTHER\')) not null, "authority_level" text check ("authority_level" in (\'NATIONAL\', \'REGIONAL\', \'LOCAL\')) not null, "contact_email" text null, "contact_phone" text null, "integration_config" jsonb null, "is_active" boolean not null default true, constraint "government_entity_pkey" primary key ("id"));');

    this.addSql('create table "government_official" ("id" varchar(255) not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, "name" text not null, "email" text not null, "phone" text null, "position" text null, "department" text null, "authority_scope" jsonb null, "nafath_id" varchar(255) null, "is_active" boolean not null default true, "entity_id" varchar(255) not null, constraint "government_official_pkey" primary key ("id"));');
    this.addSql('create unique index "government_official_nafath_id_unique" on "government_official" ("nafath_id");');

    this.addSql('alter table "government_official" add constraint "government_official_entity_id_foreign" foreign key ("entity_id") references "government_entity" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "government_official" drop constraint "government_official_entity_id_foreign";');

    this.addSql('drop table if exists "government_entity" cascade;');

    this.addSql('drop table if exists "government_official" cascade;');
  }

}
