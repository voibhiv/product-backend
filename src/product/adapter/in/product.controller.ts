import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProductUseCase } from 'src/product/application/ports/in/save-product.use-case';
import { SaveProductRequest } from './requests/save-product.request';
import { SaveProductCommand } from 'src/product/application/ports/in/save-product.command';
import { GenericFilter } from 'src/core/generics/generic-filter';

@Controller('product')
export class ProductController {
  constructor(private readonly productUseCase: ProductUseCase) {}

  @Post()
  save(@Body() request: SaveProductRequest) {
    const command: SaveProductCommand = request.toCommand();

    return this.productUseCase.saveProduct(command);
  }

  @Get()
  list(@Query() filter: GenericFilter) {
    console.log(filter);
    return 'olaaa';
  }
}
