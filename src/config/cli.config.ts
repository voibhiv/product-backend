import { DataSource } from 'typeorm';
import { ProductEntity } from 'src/product/adapter/out/product.entity';
import { ShopEntity } from 'src/shop/adapter/out/shop.entity';
import { ProductShopEntity } from 'src/product-shop/adapter/out/product-shop.entity';

require('dotenv').config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [ProductEntity, ShopEntity, ProductShopEntity],
  migrations: [
    `${__dirname.replace('/config', '')}/database/migrations/*{.ts,.js}`,
  ],
  synchronize: false,
});
