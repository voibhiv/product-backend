import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductUseCase } from 'src/product/application/ports/in/product.use-case';
import { SaveProductRequest } from './requests/save-product.request';
import { SaveProductCommand } from 'src/product/application/ports/in/save-product.command';
import { GenericFilter } from 'src/core/generics/generic-filter';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from 'src/core/generics/image.validator';

@Controller('product')
export class ProductController {
  constructor(private readonly productUseCase: ProductUseCase) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: imageFileFilter,
    }),
  )
  save(
    @Body() request: SaveProductRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) request.image = file.buffer;

    const command: SaveProductCommand = request.toCommand();

    return this.productUseCase.saveProduct(command);
  }

  @Get()
  list(@Query() filter: GenericFilter) {
    console.log(filter);
    return 'olaaa';
  }
}
