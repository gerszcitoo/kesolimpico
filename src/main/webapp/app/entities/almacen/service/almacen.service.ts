import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAlmacen, getAlmacenIdentifier } from '../almacen.model';

export type EntityResponseType = HttpResponse<IAlmacen>;
export type EntityArrayResponseType = HttpResponse<IAlmacen[]>;

@Injectable({ providedIn: 'root' })
export class AlmacenService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/almacens');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(almacen: IAlmacen): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(almacen);
    return this.http
      .post<IAlmacen>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(almacen: IAlmacen): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(almacen);
    return this.http
      .put<IAlmacen>(`${this.resourceUrl}/${getAlmacenIdentifier(almacen) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(almacen: IAlmacen): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(almacen);
    return this.http
      .patch<IAlmacen>(`${this.resourceUrl}/${getAlmacenIdentifier(almacen) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAlmacen>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAlmacen[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addAlmacenToCollectionIfMissing(almacenCollection: IAlmacen[], ...almacensToCheck: (IAlmacen | null | undefined)[]): IAlmacen[] {
    const almacens: IAlmacen[] = almacensToCheck.filter(isPresent);
    if (almacens.length > 0) {
      const almacenCollectionIdentifiers = almacenCollection.map(almacenItem => getAlmacenIdentifier(almacenItem)!);
      const almacensToAdd = almacens.filter(almacenItem => {
        const almacenIdentifier = getAlmacenIdentifier(almacenItem);
        if (almacenIdentifier == null || almacenCollectionIdentifiers.includes(almacenIdentifier)) {
          return false;
        }
        almacenCollectionIdentifiers.push(almacenIdentifier);
        return true;
      });
      return [...almacensToAdd, ...almacenCollection];
    }
    return almacenCollection;
  }

  protected convertDateFromClient(almacen: IAlmacen): IAlmacen {
    return Object.assign({}, almacen, {
      fechaEnt: almacen.fechaEnt?.isValid() ? almacen.fechaEnt.toJSON() : undefined,
      fechaSal: almacen.fechaSal?.isValid() ? almacen.fechaSal.toJSON() : undefined,
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
      res.body.forEach((almacen: IAlmacen) => {
        almacen.fechaEnt = almacen.fechaEnt ? dayjs(almacen.fechaEnt) : undefined;
        almacen.fechaSal = almacen.fechaSal ? dayjs(almacen.fechaSal) : undefined;
      });
    }
    return res;
  }
}
