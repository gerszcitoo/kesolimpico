export interface ICisterna {
  id?: number;
  estado?: string | null;
  volumen?: number | null;
}

export class Cisterna implements ICisterna {
  constructor(public id?: number, public estado?: string | null, public volumen?: number | null) {}
}

export function getCisternaIdentifier(cisterna: ICisterna): number | undefined {
  return cisterna.id;
}
