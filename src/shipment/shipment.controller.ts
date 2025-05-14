import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { ApiResponse } from '../common/resources/api-response.resource';
import { ShipmentResource } from './resources/shipment.resource';
import { ShipmentDetailResource } from './resources/shipment-detail.resource';
import { Query } from '@nestjs/common';
import { ApiOperation, ApiResponse as SwaggerApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';

@Controller('shipments')
export class ShipmentController {
  
  constructor(private readonly shipmentService: ShipmentService) {}

  @Get()
  @ApiOperation({ summary: 'Get all shipments with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
  @SwaggerApiResponse({
    status: 200,
    description: 'Successfully retrieved shipments',
    type: ApiResponse,
  })
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
  @ApiOperation({ summary: 'Create a new shipment' })
  @SwaggerApiResponse({
    status: 201,
    description: 'Successfully created a shipment',
    type: ApiResponse,
  })
  async create(@Body() dto: CreateShipmentDto) {
    const shipment = await this.shipmentService.create(dto);
    return ApiResponse.success(ShipmentResource.toJSON(shipment), 'Shipment created successfully', 201);
  }

  @Patch(':id/checkout')
  @ApiOperation({ summary: 'Update shipment status to "Out for Delivery"' })
  @ApiParam({ name: 'id', type: String, description: 'Shipment ID' })
  @SwaggerApiResponse({
    status: 200,
    description: 'Shipment status updated to "Out for Delivery"',
    type: ApiResponse,
  })
  async checkout(@Param('id') id: string) {
    const shipment = await this.shipmentService.updateStatus(id, 'Out for Delivery');
    return ApiResponse.success(ShipmentResource.toJSON(shipment), 'Shipment checked out');
  }

  @Patch(':id/deliver')
  @ApiOperation({ summary: 'Update shipment status to "Delivered"' })
  @ApiParam({ name: 'id', type: String, description: 'Shipment ID' })
  @SwaggerApiResponse({
    status: 200,
    description: 'Shipment status updated to "Delivered"',
    type: ApiResponse,
  })
  async deliver(@Param('id') id: string) {
    const shipment = await this.shipmentService.updateStatus(id, 'Delivered');
    return ApiResponse.success(ShipmentResource.toJSON(shipment), 'Shipment delivered');
  }
}
