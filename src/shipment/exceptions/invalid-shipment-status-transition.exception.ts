import { HttpStatus } from '@nestjs/common';
import { BaseException } from '../../common/exceptions/base.exception';
import { ErrorMessages } from '../enums/error-messages.enum';

export class InvalidShipmentStatusTransitionException extends BaseException {
  constructor() {
    super(
      ErrorMessages.INVALID_SHIPMENT_STATUS_TRANSITION,
      HttpStatus.BAD_REQUEST,
    );
  }
}
