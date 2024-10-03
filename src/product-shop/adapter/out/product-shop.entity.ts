import { ProductEntity } from 'src/product/adapter/out/product.entity';
import { ShopEntity } from 'src/shop/adapter/out/shop.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'product-shop' })
export class ProductShopEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'numeric', precision: 13, scale: 3, nullable: false })
  sale_price: number;

  @ManyToOne(() => ProductEntity, (product) => product.product_shop)
  product: ProductEntity;

  @ManyToOne(() => ShopEntity, (shop) => shop.product_shop, {
    eager: true,
  })
  shop: ShopEntity;
}
