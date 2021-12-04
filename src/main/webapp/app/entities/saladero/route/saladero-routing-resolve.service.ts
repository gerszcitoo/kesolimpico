import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISaladero, Saladero } from '../saladero.model';
import { SaladeroService } from '../service/saladero.service';

@Injectable({ providedIn: 'root' })
export class SaladeroRoutingResolveService implements Resolve<ISaladero> {
  constructor(protected service: SaladeroService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISaladero> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((saladero: HttpResponse<Saladero>) => {
          if (saladero.body) {
            return of(saladero.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Saladero());
  }
}
