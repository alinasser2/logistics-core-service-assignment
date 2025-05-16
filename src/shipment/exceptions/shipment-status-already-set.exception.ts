import { HttpStatus } from '@nestjs/common';
import { BaseException } from '../../common/exceptions/base.exception';
import { ErrorMessages } from '../enums/error-messages.enum';

export class ShipmentStatusAlreadySetException extends BaseException {
  constructor() {
    super(ErrorMessages.SHIPMENT_STATUS_ALREADY_SET, HttpStatus.BAD_REQUEST);
  }
}
