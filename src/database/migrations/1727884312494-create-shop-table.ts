import { ShopEntity } from 'src/shop/adapter/out/shop.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

const supermarkets: Pick<ShopEntity, 'description'>[] = [
  { description: 'Green Valley Market' },
  { description: 'Fresh Harvest Grocery' },
  { description: 'Sunshine Mart' },
  { description: 'City Fresh Foods' },
  { description: 'Happy Farms Supermarket' },
  { description: 'Daily Delights' },
  { description: 'Urban Fresh' },
  { description: 'Golden Grocer' },
  { description: "Nature's Basket" },
  { description: 'Healthy Choice Market' },
];

export class CreateShopTable1727884312494 implements MigrationInterface {
  name = 'CreateShopTable1727884312494';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "shop" ("id" SERIAL NOT NULL, "description" character varying(60) NOT NULL, CONSTRAINT "PK_ad47b7c6121fe31cb4b05438e44" PRIMARY KEY ("id"))`,
    );

    const shopRepo = queryRunner.manager.getRepository(ShopEntity);

    await shopRepo.save(supermarkets);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "shop"`);
  }
}
