import { Injectable } from '@nestjs/common';
import { Product } from 'src/product/domain/product';
import { ProductEntity } from './product.entity';
import { ProductShopEntity } from 'src/product-shop/adapter/out/product-shop.entity';
import { ShopEntity } from 'src/shop/adapter/out/shop.entity';

@Injectable()
export class ProductMapper {
  toEntity(product: Product): ProductEntity {
    const productEntity = new ProductEntity(product.description, product.cost);

    if (product.shops) {
      productEntity.product_shop = product.shops.map((shop) => {
        const productShopEntity = new ProductShopEntity();
        const shopEntity = new ShopEntity();

        shopEntity.id = shop.idShop;

        productShopEntity.sale_price = shop.shopPrice;
        productShopEntity.product = productEntity;
        productShopEntity.shop = shopEntity;

        return productShopEntity;
      });
    }

    return productEntity;
  }
}
