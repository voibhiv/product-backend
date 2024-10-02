import { DataSource } from 'typeorm';
import { ProductEntity } from 'src/product/adapter/out/product.entity';

require('dotenv').config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [ProductEntity],
  migrations: [
    `${__dirname.replace('/config', '')}/database/migrations/*{.ts,.js}`,
  ],
  synchronize: false,
});
