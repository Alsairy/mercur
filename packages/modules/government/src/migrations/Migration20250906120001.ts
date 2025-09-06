import { Migration } from '@mikro-orm/migrations';

export class Migration20250906120001 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "seller" add column "education_license_number" text null;');
    this.addSql('alter table "seller" add column "school_type" text check ("school_type" in (\'private\', \'international\', \'public\')) null;');
    this.addSql('alter table "seller" add column "education_level" text check ("education_level" in (\'elementary\', \'middle\', \'high\', \'university\')) null;');
    this.addSql('alter table "seller" add column "service_categories" jsonb null;');

    this.addSql('alter table "request" add column "service_category" text check ("service_category" in (\'construction\', \'furnishing\', \'transportation\', \'staffing\', \'training\', \'legal_consulting\', \'curriculum_support\', \'maintenance\')) null;');
    this.addSql('alter table "request" add column "requires_government_approval" boolean not null default false;');
    this.addSql('alter table "request" add column "government_approver_type" text check ("government_approver_type" in (\'MOE\', \'ETEC\', \'MUNICIPALITY\')) null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "seller" drop column "education_license_number";');
    this.addSql('alter table "seller" drop column "school_type";');
    this.addSql('alter table "seller" drop column "education_level";');
    this.addSql('alter table "seller" drop column "service_categories";');

    this.addSql('alter table "request" drop column "service_category";');
    this.addSql('alter table "request" drop column "requires_government_approval";');
    this.addSql('alter table "request" drop column "government_approver_type";');
  }

}
