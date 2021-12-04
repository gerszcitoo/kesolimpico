import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISaladero, getSaladeroIdentifier } from '../saladero.model';

export type EntityResponseType = HttpResponse<ISaladero>;
export type EntityArrayResponseType = HttpResponse<ISaladero[]>;

@Injectable({ providedIn: 'root' })
export class SaladeroService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/saladeros');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(saladero: ISaladero): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(saladero);
    return this.http
      .post<ISaladero>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(saladero: ISaladero): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(saladero);
    return this.http
      .put<ISaladero>(`${this.resourceUrl}/${getSaladeroIdentifier(saladero) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(saladero: ISaladero): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(saladero);
    return this.http
      .patch<ISaladero>(`${this.resourceUrl}/${getSaladeroIdentifier(saladero) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISaladero>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISaladero[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addSaladeroToCollectionIfMissing(saladeroCollection: ISaladero[], ...saladerosToCheck: (ISaladero | null | undefined)[]): ISaladero[] {
    const saladeros: ISaladero[] = saladerosToCheck.filter(isPresent);
    if (saladeros.length > 0) {
      const saladeroCollectionIdentifiers = saladeroCollection.map(saladeroItem => getSaladeroIdentifier(saladeroItem)!);
      const saladerosToAdd = saladeros.filter(saladeroItem => {
        const saladeroIdentifier = getSaladeroIdentifier(saladeroItem);
        if (saladeroIdentifier == null || saladeroCollectionIdentifiers.includes(saladeroIdentifier)) {
          return false;
        }
        saladeroCollectionIdentifiers.push(saladeroIdentifier);
        return true;
      });
      return [...saladerosToAdd, ...saladeroCollection];
    }
    return saladeroCollection;
  }

  protected convertDateFromClient(saladero: ISaladero): ISaladero {
    return Object.assign({}, saladero, {
      fechaEnt: saladero.fechaEnt?.isValid() ? saladero.fechaEnt.toJSON() : undefined,
      fechaSal: saladero.fechaSal?.isValid() ? saladero.fechaSal.toJSON() : undefined,
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
      res.body.forEach((saladero: ISaladero) => {
        saladero.fechaEnt = saladero.fechaEnt ? dayjs(saladero.fechaEnt) : undefined;
        saladero.fechaSal = saladero.fechaSal ? dayjs(saladero.fechaSal) : undefined;
      });
    }
    return res;
  }
}
