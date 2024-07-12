import { MigrationInterface, QueryRunner } from 'typeorm';

export class CoffeeRefactor1703860543053 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Manually added code
    await queryRunner.query(
      `ALTER TABLE "coffee" RENAME COLUMN "name" TO "title"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Manually added code
    await queryRunner.query(
      `ALTER TABLE "coffee" RENAME COLUMN "title" TO "name"`,
    );
  }
}
