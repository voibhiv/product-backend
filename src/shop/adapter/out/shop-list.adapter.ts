import { Injectable } from '@nestjs/common';
import { ShopListPort } from 'src/shop/application/ports/out/shop-list.port';
import { ShopEntity } from './shop.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shop } from 'src/shop/domain/shop';

@Injectable()
export class ShopListAdapter implements ShopListPort {
  constructor(
    @InjectRepository(ShopEntity)
    private readonly repository: Repository<ShopEntity>,
  ) {}

  async execute(): Promise<Shop[]> {
    const allShops = await this.repository.find();
    return allShops;
  }
}
