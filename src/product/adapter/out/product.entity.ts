import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  constructor(description: string, cost?: number, image?: Buffer) {
    this.description = description;
    this.cost = cost;
    this.image = image;
  }
}
