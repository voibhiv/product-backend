import { forwardRef, Module } from '@nestjs/common';
import { AdapterModule } from '../adapter/adapter.module';
import { ServicesOut } from './services';

@Module({
  imports: [forwardRef(() => AdapterModule)],
  providers: [...ServicesOut],
  exports: [...ServicesOut],
})
export class ApplicationModule {}
