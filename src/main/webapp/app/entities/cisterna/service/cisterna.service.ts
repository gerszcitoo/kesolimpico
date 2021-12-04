import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICisterna, getCisternaIdentifier } from '../cisterna.model';

export type EntityResponseType = HttpResponse<ICisterna>;
export type EntityArrayResponseType = HttpResponse<ICisterna[]>;

@Injectable({ providedIn: 'root' })
export class CisternaService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/cisternas');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(cisterna: ICisterna): Observable<EntityResponseType> {
    return this.http.post<ICisterna>(this.resourceUrl, cisterna, { observe: 'response' });
  }

  update(cisterna: ICisterna): Observable<EntityResponseType> {
    return this.http.put<ICisterna>(`${this.resourceUrl}/${getCisternaIdentifier(cisterna) as number}`, cisterna, { observe: 'response' });
  }

  partialUpdate(cisterna: ICisterna): Observable<EntityResponseType> {
    return this.http.patch<ICisterna>(`${this.resourceUrl}/${getCisternaIdentifier(cisterna) as number}`, cisterna, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICisterna>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICisterna[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCisternaToCollectionIfMissing(cisternaCollection: ICisterna[], ...cisternasToCheck: (ICisterna | null | undefined)[]): ICisterna[] {
    const cisternas: ICisterna[] = cisternasToCheck.filter(isPresent);
    if (cisternas.length > 0) {
      const cisternaCollectionIdentifiers = cisternaCollection.map(cisternaItem => getCisternaIdentifier(cisternaItem)!);
      const cisternasToAdd = cisternas.filter(cisternaItem => {
        const cisternaIdentifier = getCisternaIdentifier(cisternaItem);
        if (cisternaIdentifier == null || cisternaCollectionIdentifiers.includes(cisternaIdentifier)) {
          return false;
        }
        cisternaCollectionIdentifiers.push(cisternaIdentifier);
        return true;
      });
      return [...cisternasToAdd, ...cisternaCollection];
    }
    return cisternaCollection;
  }
}
