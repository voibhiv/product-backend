import { Body, Controller, Post } from '@nestjs/common';
import { SaveProductUseCase } from 'src/product/application/ports/in/save-product.use-case';
import { SaveProductRequest } from './requests/save-product.request';
import { SaveProductCommand } from 'src/product/application/ports/in/save-product.command';

@Controller('save-product')
export class SaveProductController {
  constructor(private readonly saveProductUseCase: SaveProductUseCase) {}

  @Post()
  save(@Body() request: SaveProductRequest) {
    const command: SaveProductCommand = request.toCommand();

    return this.saveProductUseCase.saveProduct(command);
  }
}
