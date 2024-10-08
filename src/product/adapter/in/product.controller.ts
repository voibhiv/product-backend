import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
import { ListProductRequest } from './requests/list-product.request';

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

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: imageFileFilter,
    }),
  )
  upload(
    @Body() request: SaveProductRequest,
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
  ) {
    if (file) request.image = file.buffer;

    const command: SaveProductCommand = request.toCommand();

    return this.productUseCase.updateProduct(command, id);
  }

  @Get()
  list(@Query() filter: GenericFilter & ListProductRequest) {
    return this.productUseCase.list(filter);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productUseCase.delete(id);
  }
}
