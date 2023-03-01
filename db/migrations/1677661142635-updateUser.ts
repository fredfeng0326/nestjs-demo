import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateUser1677661142635 implements MigrationInterface {
  name = 'updateUser1677661142635';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "balance" numeric(15,6) NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "balance"`);
  }
}
