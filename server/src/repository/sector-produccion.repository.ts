import { EntityRepository, Repository } from 'typeorm';
import { SectorProduccion } from '../domain/sector-produccion.entity';

@EntityRepository(SectorProduccion)
export class SectorProduccionRepository extends Repository<SectorProduccion> {}
