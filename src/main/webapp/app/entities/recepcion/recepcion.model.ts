import * as dayjs from 'dayjs';
import { ISectorProduccion } from 'app/entities/sector-produccion/sector-produccion.model';

export interface IRecepcion {
  id?: number;
  fecha?: dayjs.Dayjs | null;
  calidad?: number | null;
  cantidad?: number | null;
  analisis?: string | null;
  tambo?: string | null;
  temperatura?: number | null;
  sectorProduccions?: ISectorProduccion[] | null;
}

export class Recepcion implements IRecepcion {
  constructor(
    public id?: number,
    public fecha?: dayjs.Dayjs | null,
    public calidad?: number | null,
    public cantidad?: number | null,
    public analisis?: string | null,
    public tambo?: string | null,
    public temperatura?: number | null,
    public sectorProduccions?: ISectorProduccion[] | null
  ) {}
}

export function getRecepcionIdentifier(recepcion: IRecepcion): number | undefined {
  return recepcion.id;
}
