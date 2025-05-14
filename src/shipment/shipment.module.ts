import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipment } from './entities/shipment.entity';
import { Status } from './entities/status.entity';
import { ShipmentService } from './services/shipment.service';
import { ShipmentController } from './controllers/shipment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Shipment, Status])],
  controllers: [ShipmentController],
  providers: [ShipmentService],
})
export class ShipmentModule {}
