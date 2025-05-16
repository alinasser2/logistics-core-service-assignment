import {
  IsNotEmpty,
  IsString,
  Matches,
  Length,
  MaxLength,
  MinLength,
  IsPhoneNumber,
  IsAlphanumeric,
  IsOptional,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShipmentDto {
  @IsString()
  @IsNotEmpty({ message: 'Tracking ID is required' })
  @IsAlphanumeric(undefined, { message: 'Tracking ID must be alphanumeric' })
  @Length(9, 15, { message: 'Tracking ID must be between 9 and 15 characters' })
  @Matches(/^[A-Za-z0-9]+$/, {
    message: 'Tracking ID must only contain letters and numbers (no spaces or symbols)',
  })
  @ApiProperty({ example: 'ABC123456' })
  trackingId: string;

  @IsNotEmpty({ message: 'Phone number is required' })
  @IsString()
  @Matches(/^01[0125][0-9]{8}$/, {
    message:
      'Phone number must be a valid Egyptian mobile number starting with 010, 011, 012, or 015 followed by 8 digits',
  })
  @ApiProperty({ example: '01012345678' })
  phoneNumber: string;

  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  @MinLength(5, { message: 'Description must be at least 5 characters' })
  @MaxLength(255, { message: 'Description must not exceed 255 characters' })
  @Matches(/^[\w\s.,'"!?-]+$/, {
    message:
      'Description can only contain letters, numbers, spaces, and basic punctuation (.,\'"!?-)',
  })
  @ApiProperty({ example: 'Deliver electronics to customer in Cairo' })
  description: string;
}
