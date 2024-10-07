import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopEntity } from './out/shop.entity';
import { ShopController } from './in/shop.controller';
import { ApplicationModule } from '../application/application.module';
import { ServicesOut } from './out';

@Module({
  imports: [
    forwardRef(() => ApplicationModule),
    TypeOrmModule.forFeature([ShopEntity]),
  ],
  providers: [...ServicesOut],
  exports: [...ServicesOut],
  controllers: [ShopController],
})
export class AdapterModule {}
