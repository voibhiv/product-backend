import { Controller, Get } from '@nestjs/common';
import { ShopUseCase } from 'src/shop/application/ports/in/shop.use-case';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopUseCase: ShopUseCase) {}

  @Get()
  list() {
    return this.shopUseCase.list();
  }
}
