import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipment } from './entities/shipment.entity';
import { Status } from './entities/status.entity';
import { CreateShipmentDto } from './dto/create-shipment.dto';

@Injectable()
export class ShipmentService {
  constructor(
    @InjectRepository(Shipment)
    private shipmentRepo: Repository<Shipment>,
    @InjectRepository(Status)
    private statusRepo: Repository<Status>,
  ) {}

async findAllPaginated(page = 1, limit = 10) {
  const [data, total] = await this.shipmentRepo.findAndCount({
    take: limit,
    skip: (page - 1) * limit,
    order: { createdAt: 'DESC' },
    relations: ['status'],
  });

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
    const status = await this.statusRepo.findOne({ where: { name: 'Ready to Pick Up' } });
    if (!status) throw new Error('Status not found');

    const shipment = this.shipmentRepo.create({ ...dto, status });
    return this.shipmentRepo.save(shipment);
  }

 

  async updateStatus(id: string, newStatus: 'Out for Delivery' | 'Delivered') {
    const shipment = await this.shipmentRepo.findOne({ where: { id }, relations: ['status'] });
    if (!shipment) throw new NotFoundException('Shipment not found');

    const status = await this.statusRepo.findOne({ where: { name: newStatus } });
    if (!status) throw new BadRequestException('Invalid status transition');

    shipment.status = status;
    return this.shipmentRepo.save(shipment);
  }
}
