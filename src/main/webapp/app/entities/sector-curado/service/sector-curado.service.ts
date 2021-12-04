import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISectorCurado, getSectorCuradoIdentifier } from '../sector-curado.model';

export type EntityResponseType = HttpResponse<ISectorCurado>;
export type EntityArrayResponseType = HttpResponse<ISectorCurado[]>;

@Injectable({ providedIn: 'root' })
export class SectorCuradoService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/sector-curados');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(sectorCurado: ISectorCurado): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sectorCurado);
    return this.http
      .post<ISectorCurado>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(sectorCurado: ISectorCurado): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sectorCurado);
    return this.http
      .put<ISectorCurado>(`${this.resourceUrl}/${getSectorCuradoIdentifier(sectorCurado) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(sectorCurado: ISectorCurado): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sectorCurado);
    return this.http
      .patch<ISectorCurado>(`${this.resourceUrl}/${getSectorCuradoIdentifier(sectorCurado) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISectorCurado>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISectorCurado[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addSectorCuradoToCollectionIfMissing(
    sectorCuradoCollection: ISectorCurado[],
    ...sectorCuradosToCheck: (ISectorCurado | null | undefined)[]
  ): ISectorCurado[] {
    const sectorCurados: ISectorCurado[] = sectorCuradosToCheck.filter(isPresent);
    if (sectorCurados.length > 0) {
      const sectorCuradoCollectionIdentifiers = sectorCuradoCollection.map(
        sectorCuradoItem => getSectorCuradoIdentifier(sectorCuradoItem)!
      );
      const sectorCuradosToAdd = sectorCurados.filter(sectorCuradoItem => {
        const sectorCuradoIdentifier = getSectorCuradoIdentifier(sectorCuradoItem);
        if (sectorCuradoIdentifier == null || sectorCuradoCollectionIdentifiers.includes(sectorCuradoIdentifier)) {
          return false;
        }
        sectorCuradoCollectionIdentifiers.push(sectorCuradoIdentifier);
        return true;
      });
      return [...sectorCuradosToAdd, ...sectorCuradoCollection];
    }
    return sectorCuradoCollection;
  }

  protected convertDateFromClient(sectorCurado: ISectorCurado): ISectorCurado {
    return Object.assign({}, sectorCurado, {
      fechaEnt: sectorCurado.fechaEnt?.isValid() ? sectorCurado.fechaEnt.toJSON() : undefined,
      fechaSal: sectorCurado.fechaSal?.isValid() ? sectorCurado.fechaSal.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaEnt = res.body.fechaEnt ? dayjs(res.body.fechaEnt) : undefined;
      res.body.fechaSal = res.body.fechaSal ? dayjs(res.body.fechaSal) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((sectorCurado: ISectorCurado) => {
        sectorCurado.fechaEnt = sectorCurado.fechaEnt ? dayjs(sectorCurado.fechaEnt) : undefined;
        sectorCurado.fechaSal = sectorCurado.fechaSal ? dayjs(sectorCurado.fechaSal) : undefined;
      });
    }
    return res;
  }
}
