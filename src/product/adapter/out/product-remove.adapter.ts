import { ProductRemovePort } from 'src/product/application/ports/out/product-remove.port';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductNotExist } from 'src/core/exceptions/product/product-not-exist.exception';

export class ProductRemoveAdapter implements ProductRemovePort {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>,
  ) {}

  async execute(id: number): Promise<boolean> {
    try {
      const productExist = await this.validateProductExistence(id);

      if (!productExist) {
        throw new ProductNotExist();
      }

      const result = await this.repository.delete({ id });

      return !!result.affected;
    } catch (error) {
      throw error;
    }
  }

  async validateProductExistence(id: number): Promise<boolean> {
    const product = await this.repository.findOneBy({ id });

    return Boolean(product);
  }
}
