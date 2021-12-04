import { EntityRepository, Repository } from 'typeorm';
import { Almacen } from '../domain/almacen.entity';

@EntityRepository(Almacen)
export class AlmacenRepository extends Repository<Almacen> {}
