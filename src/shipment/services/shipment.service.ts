import { Injectable } from '@nestjs/common';
import { CreateShipmentDto } from '../web/dto/create-shipment.dto';
import { StatusRepository } from '../repositories/implementations/status.repository';
import { ShipmentStatusEnum } from '../enums/shipment-status.enum';

import { ShipmentNotFoundException } from '../exceptions/shipment-not-found.exception';
import { InvalidShipmentStatusTransitionException } from '../exceptions/invalid-shipment-status-transition.exception';
import { StatusNotFoundException } from '../exceptions/status-not-found.exception';
import { ShipmentStatusAlreadySetException } from '../exceptions/shipment-status-already-set.exception';
import { DuplicateTrackingIdException } from '../exceptions/duplicate-tracking-id.exception';
import { IShipmentRepository } from '../repositories/shipment.repository.interface';
import { Inject } from '@nestjs/common';

@Injectable()
export class ShipmentService {
  constructor(
    @Inject('IShipmentRepository')
    private readonly shipmentRepo: IShipmentRepository,
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
  newStatus: ShipmentStatusEnum.OUT_FOR_DELIVERY | ShipmentStatusEnum.DELIVERED,
) {
  const [shipment, status] = await Promise.all([
    this.shipmentRepo.findById(id),
    this.statusRepo.findByName(newStatus),
  ]);

  if (!shipment) throw new ShipmentNotFoundException();
  if (!status) throw new StatusNotFoundException();

  const currentStatus = shipment.status?.name;

  if (currentStatus === newStatus) {
    throw new ShipmentStatusAlreadySetException();
  }

  // Validate transition
  const validTransitions: Record<ShipmentStatusEnum, ShipmentStatusEnum[]> = {
    [ShipmentStatusEnum.READY_TO_PICK_UP]: [ShipmentStatusEnum.OUT_FOR_DELIVERY],
    [ShipmentStatusEnum.OUT_FOR_DELIVERY]: [ShipmentStatusEnum.DELIVERED],
    [ShipmentStatusEnum.DELIVERED]: [],
  };

  if (!validTransitions[currentStatus]?.includes(newStatus)) {
    throw new InvalidShipmentStatusTransitionException();
  }

  shipment.status = status;
  return await this.shipmentRepo.save(shipment);
}

  async softDelete(id: string): Promise<void> {
    const shipment = await this.shipmentRepo.findById(id);
    if (!shipment) throw new ShipmentNotFoundException();

    await this.shipmentRepo.softDelete(id);
  }
}
