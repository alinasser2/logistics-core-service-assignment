// shipment/exceptions/shipment-not-found.exception.ts
import { HttpStatus } from '@nestjs/common';
import { BaseException } from '../../common/exceptions/base.exception';
import { ErrorMessages } from '../enums/error-messages.enum';

export class ShipmentNotFoundException extends BaseException {
  constructor() {
    super(ErrorMessages.SHIPMENT_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}
