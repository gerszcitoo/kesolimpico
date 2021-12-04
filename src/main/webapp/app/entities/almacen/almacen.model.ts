import * as dayjs from 'dayjs';

export interface IAlmacen {
  id?: number;
  estado?: number | null;
  fechaEnt?: dayjs.Dayjs | null;
  fechaSal?: dayjs.Dayjs | null;
}

export class Almacen implements IAlmacen {
  constructor(
    public id?: number,
    public estado?: number | null,
    public fechaEnt?: dayjs.Dayjs | null,
    public fechaSal?: dayjs.Dayjs | null
  ) {}
}

export function getAlmacenIdentifier(almacen: IAlmacen): number | undefined {
  return almacen.id;
}
