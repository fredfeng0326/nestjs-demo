import { MigrationInterface, QueryRunner } from 'typeorm';

export class seedAdmin1653574205917 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // default admin password is veMeYJ9FZf, please change immediately after migration
    await queryRunner.query(
      `INSERT INTO "users"("id", "created_at", "updated_at", "email", "first_name", "last_name", "password", "refresh_token", "role") VALUES (DEFAULT, DEFAULT, DEFAULT, 'admin@test.com', 'admin', 'admin', '$2b$10$wCgpeXE3iO2znpUbDOObzO5HtedOZhxXSti.eCbjBStQIonK/ow2S', DEFAULT, 'admin')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "users" where email = 'admin@test.com'`,
    );
  }
}
