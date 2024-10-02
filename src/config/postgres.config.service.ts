import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ProductShopEntity } from 'src/product-shop/adapter/out/product-shop.entity';
import { ProductEntity } from 'src/product/adapter/out/product.entity';
import { ShopEntity } from 'src/shop/adapter/out/shop.entity';

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [ProductEntity, ShopEntity, ProductShopEntity],
      migrations: [`${__dirname}/database/migrations/*{.ts,.js}`],
      synchronize: false,
    };
  }
}
