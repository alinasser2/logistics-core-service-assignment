import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ShipmentRepository } from './shipment.repository';
import { Shipment } from '../entities/shipment.entity';

@Injectable()
export class CachedShipmentRepository {
  constructor(
    private readonly shipmentRepo: ShipmentRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findPaginated(page: number, limit: number) {
    const cacheKey = `shipments:page=${page}:limit=${limit}`;
    let cached = await this.cacheManager.get<[Shipment[], number]>(cacheKey);

    if (!cached) {
      const data = await this.shipmentRepo.findPaginated(
        (page - 1) * limit,
        limit,
      );
      await this.cacheManager.set(cacheKey, data, 60); 
      cached = data;
    }

    return cached;
  }

  async findById(id: string): Promise<Shipment | null> {
    const cacheKey = `shipment:id:${id}`;
    let cached = await this.cacheManager.get<Shipment>(cacheKey);

    if (!cached) {
      const shipment = await this.shipmentRepo.findById(id);
      if (!shipment) return null;

      await this.cacheManager.set(cacheKey, shipment, 300);
      cached = shipment;
    }

    return cached;
  }

  async findByTrackingId(trackingId: string): Promise<Shipment | null> {
    const cacheKey = `shipment:tracking:${trackingId}`;
    let cached = await this.cacheManager.get<Shipment>(cacheKey);

    if (!cached) {
      const shipment = await this.shipmentRepo.findByTrackingId(trackingId);
      if (!shipment) return null;

      await this.cacheManager.set(cacheKey, shipment, 300);
      cached = shipment;
    }

    return cached;
  }

  create(data: Partial<Shipment>) {
    return this.shipmentRepo.create(data);
  }

  async save(entity: Shipment): Promise<Shipment> {
    const saved = await this.shipmentRepo.save(entity);

    // Invalidate relevant caches
    await this.cacheManager.del(`shipment:id:${saved.id}`);
    await this.cacheManager.del(`shipment:tracking:${saved.trackingId}`);

    return saved;
  }

  async softDelete(id: string): Promise<void> {
    await this.shipmentRepo.softDelete(id);

    // Invalidate all relevant caches
    await this.cacheManager.del(`shipment:id:${id}`);
    // Optional: delete paginated cache if needed
    
  }

  async clearCache() {
    await this.cacheManager.clear();
    }
}
