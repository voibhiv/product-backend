import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCascadeDeletion1727998507458 implements MigrationInterface {
    name = 'AddCascadeDeletion1727998507458'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product-shop" DROP CONSTRAINT "FK_5e40f8953c294d6dd5440fdc0ae"`);
        await queryRunner.query(`ALTER TABLE "product-shop" ADD CONSTRAINT "FK_5e40f8953c294d6dd5440fdc0ae" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product-shop" DROP CONSTRAINT "FK_5e40f8953c294d6dd5440fdc0ae"`);
        await queryRunner.query(`ALTER TABLE "product-shop" ADD CONSTRAINT "FK_5e40f8953c294d6dd5440fdc0ae" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
