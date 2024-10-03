import { HttpException, HttpStatus } from '@nestjs/common';

export class ProductDescriptionException extends HttpException {
  constructor() {
    super(
      'Já existe um produto com essa descrição, por favor, tente novamente com outros dados!',
      HttpStatus.CONFLICT,
    );
  }
}
