import { EntityRepository, Repository } from 'typeorm';
import { SectorCurado } from '../domain/sector-curado.entity';

@EntityRepository(SectorCurado)
export class SectorCuradoRepository extends Repository<SectorCurado> {}
