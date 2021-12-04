import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFermentos, getFermentosIdentifier } from '../fermentos.model';

export type EntityResponseType = HttpResponse<IFermentos>;
export type EntityArrayResponseType = HttpResponse<IFermentos[]>;

@Injectable({ providedIn: 'root' })
export class FermentosService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/fermentos');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(fermentos: IFermentos): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fermentos);
    return this.http
      .post<IFermentos>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(fermentos: IFermentos): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fermentos);
    return this.http
      .put<IFermentos>(`${this.resourceUrl}/${getFermentosIdentifier(fermentos) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(fermentos: IFermentos): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(fermentos);
    return this.http
      .patch<IFermentos>(`${this.resourceUrl}/${getFermentosIdentifier(fermentos) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IFermentos>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IFermentos[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addFermentosToCollectionIfMissing(
    fermentosCollection: IFermentos[],
    ...fermentosToCheck: (IFermentos | null | undefined)[]
  ): IFermentos[] {
    const fermentos: IFermentos[] = fermentosToCheck.filter(isPresent);
    if (fermentos.length > 0) {
      const fermentosCollectionIdentifiers = fermentosCollection.map(fermentosItem => getFermentosIdentifier(fermentosItem)!);
      const fermentosToAdd = fermentos.filter(fermentosItem => {
        const fermentosIdentifier = getFermentosIdentifier(fermentosItem);
        if (fermentosIdentifier == null || fermentosCollectionIdentifiers.includes(fermentosIdentifier)) {
          return false;
        }
        fermentosCollectionIdentifiers.push(fermentosIdentifier);
        return true;
      });
      return [...fermentosToAdd, ...fermentosCollection];
    }
    return fermentosCollection;
  }

  protected convertDateFromClient(fermentos: IFermentos): IFermentos {
    return Object.assign({}, fermentos, {
      fecha: fermentos.fecha?.isValid() ? fermentos.fecha.toJSON() : undefined,
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
      res.body.forEach((fermentos: IFermentos) => {
        fermentos.fecha = fermentos.fecha ? dayjs(fermentos.fecha) : undefined;
      });
    }
    return res;
  }
}
