import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { ShipmentService } from '../services/shipment.service';
import { CreateShipmentDto } from '../dto/create-shipment.dto';
import { ApiResponse } from '../../common/resources/api-response.resource';
import { ShipmentResource } from '../resources/shipment.resource';
import { Query } from '@nestjs/common';
import { ApiOperation, ApiResponse as SwaggerApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { ShipmentStatusEnum } from '../enums/shipment-status.enum';
import { SuccessMessageEnum } from '../enums/shipment-success-message.enum';
import { PAGINATION } from '../../common/constants/app-constants';
import { Throttle } from '@nestjs/throttler';

@Controller('shipments')
export class ShipmentController {
  
  constructor(private readonly shipmentService: ShipmentService) {}

  @Get()
  @ApiOperation({ summary: 'Get all shipments with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
  @SwaggerApiResponse({
    status: 200,
    description: SuccessMessageEnum.SHIPMENTS_RETRIEVED,
    type: ApiResponse,
  })
  async findAll(
    @Query('page') page: number = PAGINATION.DEFAULT_PAGE,
    @Query('limit') limit: number = PAGINATION.DEFAULT_LIMIT,
  ) {
    const result = await this.shipmentService.findAllPaginated(+page, +limit);

    return ApiResponse.success(
      {
        items: ShipmentResource.collection(result.data),
        meta: result.meta,
      },
      SuccessMessageEnum.SHIPMENTS_RETRIEVED,
    );
  }


  @Post()
  @ApiOperation({ summary: 'Create a new shipment' })
  @SwaggerApiResponse({
    status: 201,
    description: SuccessMessageEnum.SHIPMENT_CREATED,
    type: ApiResponse,
  })
  async create(@Body() dto: CreateShipmentDto) {
    const shipment = await this.shipmentService.create(dto);
    return ApiResponse.success(ShipmentResource.toJSON(shipment), SuccessMessageEnum.SHIPMENT_CREATED, 201);
  }

  @Patch(':id/checkout')
  @ApiOperation({ summary: 'Update shipment status to "Out for Delivery"' })
  @ApiParam({ name: 'id', type: String, description: 'Shipment ID' })
  @SwaggerApiResponse({
    status: 200,
    description: SuccessMessageEnum.SHIPMENT_CHECKOUT,
    type: ApiResponse,
  })
  async checkout(@Param('id') id: string) {
    const shipment = await this.shipmentService.updateStatus(id, ShipmentStatusEnum.OUT_FOR_DELIVERY);
    return ApiResponse.success(ShipmentResource.toJSON(shipment), SuccessMessageEnum.SHIPMENT_CHECKOUT);
  }

  @Patch(':id/deliver')
  @ApiOperation({ summary: 'Update shipment status to "Delivered"' })
  @ApiParam({ name: 'id', type: String, description: 'Shipment ID' })
  @SwaggerApiResponse({
    status: 200,
    description: SuccessMessageEnum.SHIPMENT_DELIVERED,
    type: ApiResponse,
  })
  async deliver(@Param('id') id: string) {
    const shipment = await this.shipmentService.updateStatus(id, ShipmentStatusEnum.DELIVERED);
    return ApiResponse.success(ShipmentResource.toJSON(shipment), SuccessMessageEnum.SHIPMENT_DELIVERED);
  }


  // controllers/shipment.controller.ts
  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a shipment by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Shipment ID' })
  @SwaggerApiResponse({
    status: 200,
    description: SuccessMessageEnum.SHIPMENT_DELETED,
    type: ApiResponse,
  })
  async delete(@Param('id') id: string) {
    await this.shipmentService.softDelete(id);
    return ApiResponse.success(null, SuccessMessageEnum.SHIPMENT_DELETED);
  }


}
