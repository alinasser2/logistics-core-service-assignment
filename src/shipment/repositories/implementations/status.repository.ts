// repositories/status.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from '../../entities/status.entity';

@Injectable()
export class StatusRepository {
  constructor(
    @InjectRepository(Status)
    private readonly repo: Repository<Status>,
  ) {}

  findByName(name: string) {
    return this.repo.findOne({ where: { name } });
  }
}
