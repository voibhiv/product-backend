import { ProductUpdatePort } from 'src/product/application/ports/out/product-update.port';
import { In, Not, Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SaveProductCommand } from 'src/product/application/ports/in/save-product.command';
import { SaveProductShopCommand } from 'src/product-shop/application/ports/in/product-shop.command';
import { ProductShopEntity } from 'src/product-shop/adapter/out/product-shop.entity';
import { ProductDescriptionException } from 'src/core/exceptions/product/product-description.exception';
import { ProductCostException } from 'src/core/exceptions/product/product-cost.exception';
import { ProductMapper } from './product.mapper';
import { Product } from 'src/product/domain/product';
import { ShopEntity } from 'src/shop/adapter/out/shop.entity';

export class ProductUpdateAdapter implements ProductUpdatePort {
  constructor(
    private productMapper: ProductMapper,
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>,
    @InjectRepository(ProductShopEntity)
    private readonly repositoryProductShop: Repository<ProductShopEntity>,
  ) {}

  async execute(command: SaveProductCommand, id: number): Promise<Product> {
    const allIdsSended = command.shops.map((shop) => shop.idShop);
    const shopsNotSended = await this.getShopsIdsToRemove(allIdsSended, id);
    const toRemoveIds = shopsNotSended.map((productShop) => productShop.id);
    await this.deleteRelations(toRemoveIds);
    const productEntity = await this.repository.findOneBy({ id });

    try {
      const hasProductWithSameDescription = await this.validateName(
        command.description,
        id,
      );

      if (hasProductWithSameDescription) {
        throw new ProductDescriptionException();
      }

      if (command.cost) {
        const costAsString = command.cost.toString();
        const isValidFormat = /^\d{1,10}(\.\d{1,3})?$/.test(costAsString);

        if (!isValidFormat) throw new ProductCostException();
      }

      productEntity.cost = command.cost;
      productEntity.description = command.description;
      if (command.image) {
        productEntity.image = command.image;
      }

      command.shops.forEach((shop) => {
        const productShopEntity = productEntity.product_shop.find(
          (productSE) => productSE.shop.id === shop.idShop,
        );

        if (productShopEntity) {
          productShopEntity.sale_price = shop.shopPrice;
        } else {
          const productShopEntity = new ProductShopEntity();
          const shopEntity = new ShopEntity();
          shopEntity.id = shop.idShop;
          productShopEntity.sale_price = Number(shop.shopPrice);
          productShopEntity.product = productEntity;
          productShopEntity.shop = shopEntity;
          productEntity.product_shop.push(productShopEntity);
        }
      });

      const productSaved = await this.repository.save(productEntity);

      const productToReturn = await this.repository.findOne({
        where: { id: productSaved.id },
        relations: ['product_shop', 'product_shop.shop'],
      });

      return this.productMapper.toResponse(productToReturn);
    } catch (error) {
      throw error;
    }
  }

  async getShopsIdsToRemove(
    allIdsSended: number[],
    id: number,
  ): Promise<ProductShopEntity[]> {
    return this.repositoryProductShop.find({
      select: {
        id: true,
      },
      where: {
        product: {
          id,
        },
        shop: {
          id: Not(In(allIdsSended)),
        },
      },
    });
  }

  async deleteRelations(ids: number[]) {
    return this.repositoryProductShop.delete({
      id: In(ids),
    });
  }

  async validateName(description: string, id: number): Promise<boolean> {
    const validateByDescription = await this.repository.findOne({
      where: {
        description,
        id: Not(id),
      },
    });

    return Boolean(validateByDescription);
  }
}
