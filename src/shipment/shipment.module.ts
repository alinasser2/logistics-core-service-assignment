import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipment } from './entities/shipment.entity';
import { Status } from './entities/status.entity';
import { ShipmentService } from './services/shipment.service';
import { ShipmentRepositoryImpl } from './repositories/implementations/shipment.repository.impl';
import { StatusRepository } from './repositories/implementations/status.repository';
import { ShipmentController } from './web/controllers/shipment.controller';
import { ShipmentRepositoryProxy } from './repositories/implementations/shipment.repository.proxy';

@Module({
  imports: [TypeOrmModule.forFeature([Shipment, Status])],
  controllers: [ShipmentController], 
  providers: [
    ShipmentService,
    ShipmentRepositoryImpl,
    ShipmentRepositoryProxy,
    {
      provide: 'IShipmentRepository',
      useExisting: ShipmentRepositoryProxy,
    },
    StatusRepository,
  ],

  exports: [ShipmentService],
})
export class ShipmentModule {}