import * as dayjs from 'dayjs';

export interface ISaladero {
  id?: number;
  fechaEnt?: dayjs.Dayjs | null;
  fechaSal?: dayjs.Dayjs | null;
  peso?: number | null;
}

export class Saladero implements ISaladero {
  constructor(
    public id?: number,
    public fechaEnt?: dayjs.Dayjs | null,
    public fechaSal?: dayjs.Dayjs | null,
    public peso?: number | null
  ) {}
}

export function getSaladeroIdentifier(saladero: ISaladero): number | undefined {
  return saladero.id;
}
