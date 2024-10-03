import { HttpException, HttpStatus } from '@nestjs/common';

export class ProductNotExist extends HttpException {
  constructor() {
    super(
      'O {id} fornecido não existe na base de dados, por favor, tente novamente mais tarde!',
      HttpStatus.NOT_FOUND,
    );
  }
}
