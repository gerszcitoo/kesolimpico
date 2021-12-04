import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISectorCurado, SectorCurado } from '../sector-curado.model';
import { SectorCuradoService } from '../service/sector-curado.service';

@Injectable({ providedIn: 'root' })
export class SectorCuradoRoutingResolveService implements Resolve<ISectorCurado> {
  constructor(protected service: SectorCuradoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISectorCurado> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((sectorCurado: HttpResponse<SectorCurado>) => {
          if (sectorCurado.body) {
            return of(sectorCurado.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SectorCurado());
  }
}
