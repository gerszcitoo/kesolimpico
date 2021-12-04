import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISectorProduccion, SectorProduccion } from '../sector-produccion.model';
import { SectorProduccionService } from '../service/sector-produccion.service';

@Injectable({ providedIn: 'root' })
export class SectorProduccionRoutingResolveService implements Resolve<ISectorProduccion> {
  constructor(protected service: SectorProduccionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISectorProduccion> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((sectorProduccion: HttpResponse<SectorProduccion>) => {
          if (sectorProduccion.body) {
            return of(sectorProduccion.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SectorProduccion());
  }
}
