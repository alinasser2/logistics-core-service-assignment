import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Shipment } from './shipment.entity';

@Entity()
export class Status {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Shipment, shipment => shipment.status)
  shipments: Shipment[];
}
