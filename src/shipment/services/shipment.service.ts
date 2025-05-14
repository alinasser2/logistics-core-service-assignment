import { Injectable } from '@nestjs/common';
import { CreateShipmentDto } from '../dto/create-shipment.dto';
import { ShipmentRepository } from '../repositories/shipment.repository';
import { StatusRepository } from '../repositories/status.repository';
import { ShipmentStatusEnum } from '../enums/shipment-status.enum';

import { ShipmentNotFoundException } from '../exceptions/shipment-not-found.exception';
import { StatusNotFoundException } from '../exceptions/status-not-found.exception';
import { DuplicateTrackingIdException } from '../exceptions/duplicate-tracking-id.exception';
import { CachedShipmentRepository } from '../repositories/shipment-cache.repository';

@Injectable()
export class ShipmentService {
  constructor(
    private readonly shipmentRepo: CachedShipmentRepository,
    private readonly statusRepo: StatusRepository,
  ) {}

  async findAllPaginated(page = 1, limit = 10) {
    const [data, total] = await this.shipmentRepo.findPaginated(
      (page - 1) * limit,
      limit,
    );

    return {
      data,
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async create(dto: CreateShipmentDto) {
    const existing = await this.shipmentRepo.findByTrackingId(dto.trackingId);
    if (existing) throw new DuplicateTrackingIdException();

    const status = await this.statusRepo.findByName(
      ShipmentStatusEnum.READY_TO_PICK_UP,
    );
    if (!status) throw new StatusNotFoundException();

    const shipment = this.shipmentRepo.create({ ...dto, status });
    return this.shipmentRepo.save(shipment);
  }

  async updateStatus(
    id: string,
    newStatus:
      | ShipmentStatusEnum.OUT_FOR_DELIVERY
      | ShipmentStatusEnum.DELIVERED,
  ) {
    const shipment = await this.shipmentRepo.findById(id);
    if (!shipment) throw new ShipmentNotFoundException();

    const status = await this.statusRepo.findByName(newStatus);
    if (!status) throw new StatusNotFoundException();

    shipment.status = status;
    return this.shipmentRepo.save(shipment);
  }

async softDelete(id: string): Promise<void> {
  const shipment = await this.shipmentRepo.findById(id);
  if (!shipment) throw new ShipmentNotFoundException();

  await this.shipmentRepo.softDelete(id);
}

}
