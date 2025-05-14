import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { ApiResponse } from '../common/resources/api-response.resource';
import { ShipmentResource } from './resources/shipment.resource';
import { ShipmentDetailResource } from './resources/shipment-detail.resource';
import { Query } from '@nestjs/common';

@Controller('shipments')
export class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) {}

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const result = await this.shipmentService.findAllPaginated(+page, +limit);

    return ApiResponse.success(
      {
        items: ShipmentResource.collection(result.data),
        meta: result.meta,
      },
      'Shipments retrieved successfully'
    );
  }


  @Post()
  async create(@Body() dto: CreateShipmentDto) {
    const shipment = await this.shipmentService.create(dto);
    return ApiResponse.success(ShipmentResource.toJSON(shipment), 'Shipment created successfully', 201);
  }

  @Patch(':id/checkout')
  async checkout(@Param('id') id: string) {
    const shipment = await this.shipmentService.updateStatus(id, 'Out for Delivery');
    return ApiResponse.success(ShipmentResource.toJSON(shipment), 'Shipment checked out');
  }

  @Patch(':id/deliver')
  async deliver(@Param('id') id: string) {
    const shipment = await this.shipmentService.updateStatus(id, 'Delivered');
    return ApiResponse.success(ShipmentResource.toJSON(shipment), 'Shipment delivered');
  }
}
