import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  DeleteDateColumn,
} from 'typeorm';
import { Status } from './status.entity';

@Entity('shipments')
export class Shipment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'tracking_id', unique: true })
  @Index()
  trackingId: string;

  @Column({ name: 'phone_number' })
  @Index()
  phoneNumber: string;

  @Column()
  description: string;

  @ManyToOne(() => Status, { eager: true })
  @Index() 
  status: Status;

  @CreateDateColumn({ name: 'creation_date' })
  @Index() 
  createdAt: Date;

  @UpdateDateColumn({ name: 'modification_date' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
