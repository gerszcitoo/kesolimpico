import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISectorProduccion, getSectorProduccionIdentifier } from '../sector-produccion.model';

export type EntityResponseType = HttpResponse<ISectorProduccion>;
export type EntityArrayResponseType = HttpResponse<ISectorProduccion[]>;

@Injectable({ providedIn: 'root' })
export class SectorProduccionService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/sector-produccions');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(sectorProduccion: ISectorProduccion): Observable<EntityResponseType> {
    return this.http.post<ISectorProduccion>(this.resourceUrl, sectorProduccion, { observe: 'response' });
  }

  update(sectorProduccion: ISectorProduccion): Observable<EntityResponseType> {
    return this.http.put<ISectorProduccion>(
      `${this.resourceUrl}/${getSectorProduccionIdentifier(sectorProduccion) as number}`,
      sectorProduccion,
      { observe: 'response' }
    );
  }

  partialUpdate(sectorProduccion: ISectorProduccion): Observable<EntityResponseType> {
    return this.http.patch<ISectorProduccion>(
      `${this.resourceUrl}/${getSectorProduccionIdentifier(sectorProduccion) as number}`,
      sectorProduccion,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISectorProduccion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISectorProduccion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addSectorProduccionToCollectionIfMissing(
    sectorProduccionCollection: ISectorProduccion[],
    ...sectorProduccionsToCheck: (ISectorProduccion | null | undefined)[]
  ): ISectorProduccion[] {
    const sectorProduccions: ISectorProduccion[] = sectorProduccionsToCheck.filter(isPresent);
    if (sectorProduccions.length > 0) {
      const sectorProduccionCollectionIdentifiers = sectorProduccionCollection.map(
        sectorProduccionItem => getSectorProduccionIdentifier(sectorProduccionItem)!
      );
      const sectorProduccionsToAdd = sectorProduccions.filter(sectorProduccionItem => {
        const sectorProduccionIdentifier = getSectorProduccionIdentifier(sectorProduccionItem);
        if (sectorProduccionIdentifier == null || sectorProduccionCollectionIdentifiers.includes(sectorProduccionIdentifier)) {
          return false;
        }
        sectorProduccionCollectionIdentifiers.push(sectorProduccionIdentifier);
        return true;
      });
      return [...sectorProduccionsToAdd, ...sectorProduccionCollection];
    }
    return sectorProduccionCollection;
  }
}
