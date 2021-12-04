import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IRecepcion, getRecepcionIdentifier } from '../recepcion.model';

export type EntityResponseType = HttpResponse<IRecepcion>;
export type EntityArrayResponseType = HttpResponse<IRecepcion[]>;

@Injectable({ providedIn: 'root' })
export class RecepcionService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/recepcions');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(recepcion: IRecepcion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(recepcion);
    return this.http
      .post<IRecepcion>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(recepcion: IRecepcion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(recepcion);
    return this.http
      .put<IRecepcion>(`${this.resourceUrl}/${getRecepcionIdentifier(recepcion) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(recepcion: IRecepcion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(recepcion);
    return this.http
      .patch<IRecepcion>(`${this.resourceUrl}/${getRecepcionIdentifier(recepcion) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IRecepcion>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRecepcion[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addRecepcionToCollectionIfMissing(
    recepcionCollection: IRecepcion[],
    ...recepcionsToCheck: (IRecepcion | null | undefined)[]
  ): IRecepcion[] {
    const recepcions: IRecepcion[] = recepcionsToCheck.filter(isPresent);
    if (recepcions.length > 0) {
      const recepcionCollectionIdentifiers = recepcionCollection.map(recepcionItem => getRecepcionIdentifier(recepcionItem)!);
      const recepcionsToAdd = recepcions.filter(recepcionItem => {
        const recepcionIdentifier = getRecepcionIdentifier(recepcionItem);
        if (recepcionIdentifier == null || recepcionCollectionIdentifiers.includes(recepcionIdentifier)) {
          return false;
        }
        recepcionCollectionIdentifiers.push(recepcionIdentifier);
        return true;
      });
      return [...recepcionsToAdd, ...recepcionCollection];
    }
    return recepcionCollection;
  }

  protected convertDateFromClient(recepcion: IRecepcion): IRecepcion {
    return Object.assign({}, recepcion, {
      fecha: recepcion.fecha?.isValid() ? recepcion.fecha.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fecha = res.body.fecha ? dayjs(res.body.fecha) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((recepcion: IRecepcion) => {
        recepcion.fecha = recepcion.fecha ? dayjs(recepcion.fecha) : undefined;
      });
    }
    return res;
  }
}
