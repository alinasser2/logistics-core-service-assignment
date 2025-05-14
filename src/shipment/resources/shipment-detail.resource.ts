import { Shipment } from '../entities/shipment.entity';

export class ShipmentDetailResource {
  static toJSON(shipment: Shipment) {
    return {
      id: shipment.id,
      trackingId: shipment.trackingId,
      phoneNumber: shipment.phoneNumber,
      description: shipment.description,
      status: {
        id: shipment.status?.id ?? null,
        name: shipment.status?.name ?? null,
      },
      createdAt: shipment.createdAt,
      updatedAt: shipment.updatedAt,
    };
  }
}
