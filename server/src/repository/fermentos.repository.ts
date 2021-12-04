import { EntityRepository, Repository } from 'typeorm';
import { Fermentos } from '../domain/fermentos.entity';

@EntityRepository(Fermentos)
export class FermentosRepository extends Repository<Fermentos> {}
