import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidImageFormatType extends HttpException {
  constructor() {
    super(
      'Somente arquivos JPG e PNG são permitidos!',
      HttpStatus.BAD_REQUEST,
    );
  }
}
