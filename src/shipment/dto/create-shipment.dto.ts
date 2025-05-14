import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateShipmentDto {
    @IsString()
    @IsNotEmpty()
    trackingId: string;

    @IsPhoneNumber('EG')
    @IsNotEmpty()
    phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}
