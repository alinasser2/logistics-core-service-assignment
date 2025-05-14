import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipmentModule } from './shipment/shipment.module';
import { Shipment } from './shipment/entities/shipment.entity';
import { Status } from './shipment/entities/status.entity';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,       
    }]),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'logistics.db',
      entities: [Shipment, Status],
      synchronize: true,
    }),
    ShipmentModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}