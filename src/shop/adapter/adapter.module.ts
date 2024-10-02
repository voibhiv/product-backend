import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopEntity } from './out/shop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShopEntity])],
  providers: [],
  exports: [],
  controllers: [],
})
export class AdapterModule {}
