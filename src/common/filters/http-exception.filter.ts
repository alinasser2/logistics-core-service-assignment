import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();

      const responseBody = exception.getResponse();

      if (typeof responseBody === 'object' && responseBody !== null && 'message' in responseBody) {
        message = (responseBody as any).message;
      } else if (typeof responseBody === 'string') {
        message = responseBody;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    response.status(status).json({
      errorResponse: {
        status,
        message,
      },
    });
  }
}
