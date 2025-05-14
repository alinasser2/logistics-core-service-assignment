import { HttpStatus } from '@nestjs/common';
import { BaseException } from '../../common/exceptions/base.exception';
import { ErrorMessages } from '../enums/error-messages.enum';

export class DuplicateTrackingIdException extends BaseException {
  constructor() {
    super(ErrorMessages.DUPLICATE_TRACKING_ID, HttpStatus.CONFLICT);
  }
}
