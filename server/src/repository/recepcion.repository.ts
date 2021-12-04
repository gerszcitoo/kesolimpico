import { EntityRepository, Repository } from 'typeorm';
import { Recepcion } from '../domain/recepcion.entity';

@EntityRepository(Recepcion)
export class RecepcionRepository extends Repository<Recepcion> {}
