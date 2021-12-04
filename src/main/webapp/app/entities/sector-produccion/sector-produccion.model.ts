import { IFermentos } from 'app/entities/fermentos/fermentos.model';
import { IRecepcion } from 'app/entities/recepcion/recepcion.model';

export interface ISectorProduccion {
  id?: number;
  peso?: number | null;
  fermentos?: IFermentos | null;
  recepcion?: IRecepcion | null;
}

export class SectorProduccion implements ISectorProduccion {
  constructor(
    public id?: number,
    public peso?: number | null,
    public fermentos?: IFermentos | null,
    public recepcion?: IRecepcion | null
  ) {}
}

export function getSectorProduccionIdentifier(sectorProduccion: ISectorProduccion): number | undefined {
  return sectorProduccion.id;
}
