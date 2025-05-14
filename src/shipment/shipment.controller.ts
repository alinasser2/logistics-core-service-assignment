import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';

@Controller('shipments')
export class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) {}

  @Get()
  findAll() {
    return this.shipmentService.findAll();
  }

  @Post()
  create(@Body() dto: CreateShipmentDto) {
    return this.shipmentService.create(dto);
  }

  @Patch(':id/checkout')
  checkout(@Param('id') id: string) {
    return this.shipmentService.updateStatus(id, 'Out for Delivery');
  }

  @Patch(':id/deliver')
  deliver(@Param('id') id: string) {
    return this.shipmentService.updateStatus(id, 'Delivered');
  }
}
