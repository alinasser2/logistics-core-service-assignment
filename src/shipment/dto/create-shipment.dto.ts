import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShipmentDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '123456789' })
    trackingId: string;

    @IsPhoneNumber('EG')
    @IsNotEmpty()
    @ApiProperty({ example: '0123456789' })
    phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Electronics delivery' })
    description: string;
}
