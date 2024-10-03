import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateShopProductTableAndAddRelations1727890016185
  implements MigrationInterface
{
  name = 'CreateShopProductTableAndAddRelations1727890016185';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product-shop" ("id" SERIAL NOT NULL, "sale_price" numeric(13,3) NOT NULL, "productId" integer, "shopId" integer, CONSTRAINT "PK_4ab815836927e67109dad05e121" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "product-shop" ADD CONSTRAINT "FK_5e40f8953c294d6dd5440fdc0ae" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product-shop" ADD CONSTRAINT "FK_f71cde4aaae44072efe765816b6" FOREIGN KEY ("shopId") REFERENCES "shop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product-shop" DROP CONSTRAINT "FK_f71cde4aaae44072efe765816b6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product-shop" DROP CONSTRAINT "FK_5e40f8953c294d6dd5440fdc0ae"`,
    );
    await queryRunner.query(`DROP TABLE "product-shop"`);
  }
}
