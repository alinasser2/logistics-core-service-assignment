// shipment/exceptions/status-not-found.exception.ts
import { HttpStatus } from '@nestjs/common';
import { BaseException } from '../../common/exceptions/base.exception';
import { ErrorMessages } from '../enums/error-messages.enum';

export class StatusNotFoundException extends BaseException {
  constructor() {
    super(ErrorMessages.STATUS_NOT_FOUND, HttpStatus.BAD_REQUEST);
  }
}
