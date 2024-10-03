import { HttpException, HttpStatus } from '@nestjs/common';

export class ProductCostException extends HttpException {
  constructor() {
    super(
      'O preço do produto informado não é valido, tente novamente com outro valor!',
      HttpStatus.BAD_REQUEST,
    );
  }
}
