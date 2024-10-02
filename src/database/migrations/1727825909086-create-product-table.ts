import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductTable1727825909086 implements MigrationInterface {
  name = 'CreateProductTable1727825909086';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product" ("id" SERIAL NOT NULL, "description" character varying(60) NOT NULL, "cost" numeric(13,3), "image" bytea, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "product"`);
  }
}
