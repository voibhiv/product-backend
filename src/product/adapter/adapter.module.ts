import { forwardRef, Module } from '@nestjs/common';
import { ApplicationModule } from '../application/application.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './out/product.entity';
import { SaveProductController } from './in/save-product.controller';
import { ServicesOut } from './out';

@Module({
  imports: [
    forwardRef(() => ApplicationModule),
    TypeOrmModule.forFeature([ProductEntity]),
  ],
  providers: [...ServicesOut],
  exports: [...ServicesOut],
  controllers: [SaveProductController],
})
export class AdapterModule {}
