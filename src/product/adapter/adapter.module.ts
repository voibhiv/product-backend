import { forwardRef, Module } from '@nestjs/common';
import { ApplicationModule } from '../application/application.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './out/product.entity';
import { ProductController } from './in/product.controller';
import { ServicesOut } from './out';

@Module({
  imports: [
    forwardRef(() => ApplicationModule),
    TypeOrmModule.forFeature([ProductEntity]),
  ],
  providers: [...ServicesOut],
  exports: [...ServicesOut],
  controllers: [ProductController],
})
export class AdapterModule {}
