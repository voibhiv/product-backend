import { ProductShopEntity } from "src/product-shop/adapter/out/product-shop.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'shop' })
export class ShopEntity {

  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({
    type: 'varchar',
    length: 60,
    nullable: false,
  })
  description: string;

  @OneToMany(() => ProductShopEntity, (productShop) => productShop.shop)
  product_shop: ProductShopEntity[];

}