import { Provider } from '@nestjs/common';
import { ProductPersistencePort } from 'src/product/application/ports/out/product-persistence.port';
import { ProductPersistenceAdapter } from './product-persistence.adapter';
import { ProductMapper } from './product.mapper';
import { ProductListPort } from 'src/product/application/ports/out/product-list.port';
import { ProductListAdapter } from './product-list.adapter';
import { ProductRemovePort } from 'src/product/application/ports/out/product-remove.port';
import { ProductRemoveAdapter } from './product-remove.adapter';

export const ServicesOut: Provider[] = [
  {
    provide: ProductPersistencePort,
    useClass: ProductPersistenceAdapter,
  },
  {
    provide: ProductListPort,
    useClass: ProductListAdapter,
  },
  {
    provide: ProductRemovePort,
    useClass: ProductRemoveAdapter,
  },
  ProductMapper,
];
