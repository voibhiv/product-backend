import { ProductShopEntity } from 'src/product-shop/adapter/out/product-shop.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'product' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 60,
    nullable: false,
  })
  description: string;

  @Column({ type: 'numeric', precision: 13, scale: 3, nullable: true })
  cost?: number;

  @Column({ type: 'bytea', nullable: true })
  image?: Buffer;

  @OneToMany(() => ProductShopEntity, (productShop) => productShop.product, {
    cascade: ['insert', 'update'],
    eager: true,
  })
  product_shop: ProductShopEntity[];

  constructor(description: string, cost?: number, image?: Buffer) {
    this.description = description;
    this.cost = cost;
    this.image = image;
  }
}
