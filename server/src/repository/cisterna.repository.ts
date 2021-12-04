import { EntityRepository, Repository } from 'typeorm';
import { Cisterna } from '../domain/cisterna.entity';

@EntityRepository(Cisterna)
export class CisternaRepository extends Repository<Cisterna> {}
