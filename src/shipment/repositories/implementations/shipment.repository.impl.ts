import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipment } from '../../entities/shipment.entity';
import { IShipmentRepository } from '../shipment.repository.interface';

@Injectable()
export class ShipmentRepositoryImpl implements IShipmentRepository{
  constructor(
    @InjectRepository(Shipment)
    private readonly repo: Repository<Shipment>,
  ) {}

  findPaginated(skip: number, take: number) {
    return this.repo.findAndCount({
      take,
      skip,
      order: { createdAt: 'DESC' },
      relations: ['status'],
    });
  }

  findById(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['status'] });
  }

  create(data: Partial<Shipment>) {
    return this.repo.create(data);
  }

  save(entity: Shipment) {
    return this.repo.save(entity);
  }

  async findByTrackingId(trackingId: string): Promise<Shipment | null> {
    return this.repo.findOne({ where: { trackingId } });
  }

  async softDelete(id: string): Promise<void> {
  await this.repo.softDelete(id);
}
}
