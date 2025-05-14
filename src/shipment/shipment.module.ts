import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipment } from './entities/shipment.entity';
import { Status } from './entities/status.entity';
import { ShipmentService } from './shipment.service';
import { ShipmentController } from './shipment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Shipment, Status])],
  controllers: [ShipmentController],
  providers: [ShipmentService],
})
export class ShipmentModule {}
