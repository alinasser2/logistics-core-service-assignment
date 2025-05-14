import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index } from 'typeorm';
import { Shipment } from './shipment.entity';

@Entity('statuses')
export class Status {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @Index()
  name: string;

  @OneToMany(() => Shipment, shipment => shipment.status)
  shipments: Shipment[];
}
