import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { ProductMapper } from './product.mapper';
import { Repository } from 'typeorm';

export class ProductListAdapter implements ProductListAdapter {
  constructor(
    private productMapper: ProductMapper,
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>,
  ) {}

  async execute() {
    
  }

}
