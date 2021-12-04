import * as dayjs from 'dayjs';

export interface ISectorCurado {
  id?: number;
  fechaEnt?: dayjs.Dayjs | null;
  fechaSal?: dayjs.Dayjs | null;
  temperatura?: number | null;
  calidad?: number | null;
  humedad?: number | null;
  co2?: number | null;
  pesoEnt?: number | null;
  pesoSal?: number | null;
}

export class SectorCurado implements ISectorCurado {
  constructor(
    public id?: number,
    public fechaEnt?: dayjs.Dayjs | null,
    public fechaSal?: dayjs.Dayjs | null,
    public temperatura?: number | null,
    public calidad?: number | null,
    public humedad?: number | null,
    public co2?: number | null,
    public pesoEnt?: number | null,
    public pesoSal?: number | null
  ) {}
}

export function getSectorCuradoIdentifier(sectorCurado: ISectorCurado): number | undefined {
  return sectorCurado.id;
}
