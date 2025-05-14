import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from './status.entity';

@Entity()
export class Shipment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'tracking_id', unique: true })
  trackingId: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column()
  description: string;

  @ManyToOne(() => Status, { eager: true })
  status: Status;

  @CreateDateColumn({ name: 'creation_date' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'modification_date' })
  updatedAt: Date;
}
