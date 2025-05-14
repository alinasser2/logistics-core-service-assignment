import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipment } from './entities/shipment.entity';
import { Status } from './entities/status.entity';
import { ShipmentService } from './services/shipment.service';
import { ShipmentRepository } from './repositories/shipment.repository';
import { StatusRepository } from './repositories/status.repository';
import { ShipmentController } from './controllers/shipment.controller';
import { CachedShipmentRepository } from './repositories/shipment-cache.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Shipment, Status])],
  controllers: [ShipmentController], 
  providers: [ShipmentService, ShipmentRepository, StatusRepository, CachedShipmentRepository],
  exports: [ShipmentService],
})
export class ShipmentModule {}