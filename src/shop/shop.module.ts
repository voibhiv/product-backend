import { Module } from '@nestjs/common';
import { AdapterModule } from './adapter/adapter.module';

@Module({
  imports: [AdapterModule],
})
export class ShopModule {}
