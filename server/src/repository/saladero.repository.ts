import { EntityRepository, Repository } from 'typeorm';
import { Saladero } from '../domain/saladero.entity';

@EntityRepository(Saladero)
export class SaladeroRepository extends Repository<Saladero> {}
