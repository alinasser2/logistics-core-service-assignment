import { Shipment } from '../../entities/shipment.entity';

export class ShipmentResource {
  static toJSON(shipment: Shipment) {
    return {
      id: shipment.id,
      trackingId: shipment.trackingId,
      phoneNumber: shipment.phoneNumber,
      description: shipment.description,
      status: shipment.status?.name ?? null,
      createdAt: shipment.createdAt,
      updatedAt: shipment.updatedAt,
    };
  }

  static collection(shipments: Shipment[]) {
    return shipments.map(this.toJSON);
  }
}
