import { Provider } from '@nestjs/common';
import { ProductPersistencePort } from 'src/product/application/ports/out/product-persistence.adapter';
import { ProductPersistenceAdapter } from './product-persistence.adapter';
import { ProductMapper } from './product.mapper';
import { ProductListPort } from 'src/product/application/ports/out/product-list.adapter';
import { ProductListAdapter } from './product-list.adapter';

export const ServicesOut: Provider[] = [
  {
    provide: ProductPersistencePort,
    useClass: ProductPersistenceAdapter,
  },
  {
    provide: ProductListPort,
    useClass: ProductListAdapter,
  },
  ProductMapper,
];
