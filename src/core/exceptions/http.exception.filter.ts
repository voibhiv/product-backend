import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';

@Catch(HttpException)
@Injectable()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    let errorResponse;

    if (exception instanceof HttpException) {
      const responseData = exception.getResponse() as any;

      if (status === HttpStatus.BAD_REQUEST && responseData.message) {
        errorResponse = {
          statusCode: status,
          errorData: responseData.message,
          message: responseData.error || 'Bad Request Exception',
          path: request.url,
          timestamp: new Date().toISOString(),
        };
      } else {
        errorResponse = {
          statusCode: status,
          errorData: null,
          message: exception.message || 'An error occurred',
          path: request.url,
          timestamp: new Date().toISOString(),
        };
      }
    }

    response.status(status).json(errorResponse);
  }
}
