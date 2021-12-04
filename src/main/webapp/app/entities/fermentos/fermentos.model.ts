import * as dayjs from 'dayjs';
import { ISectorProduccion } from 'app/entities/sector-produccion/sector-produccion.model';

export interface IFermentos {
  id?: number;
  fecha?: dayjs.Dayjs | null;
  peso?: number | null;
  calidad?: number | null;
  detalle?: string | null;
  tipoQueso?: string | null;
  sectorProduccions?: ISectorProduccion[] | null;
}

export class Fermentos implements IFermentos {
  constructor(
    public id?: number,
    public fecha?: dayjs.Dayjs | null,
    public peso?: number | null,
    public calidad?: number | null,
    public detalle?: string | null,
    public tipoQueso?: string | null,
    public sectorProduccions?: ISectorProduccion[] | null
  ) {}
}

export function getFermentosIdentifier(fermentos: IFermentos): number | undefined {
  return fermentos.id;
}
