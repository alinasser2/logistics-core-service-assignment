import { Shipment } from '../entities/shipment.entity';

export interface IShipmentRepository {
  findPaginated(page: number, limit: number): Promise<[Shipment[], number]>;
  findById(id: string): Promise<Shipment | null>;
  findByTrackingId(trackingId: string): Promise<Shipment | null>;
  create(data: Partial<Shipment>): Shipment;
  save(entity: Shipment): Promise<Shipment>;
  softDelete(id: string): Promise<void>;
}
