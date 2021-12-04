import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICisterna, Cisterna } from '../cisterna.model';
import { CisternaService } from '../service/cisterna.service';

@Injectable({ providedIn: 'root' })
export class CisternaRoutingResolveService implements Resolve<ICisterna> {
  constructor(protected service: CisternaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICisterna> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cisterna: HttpResponse<Cisterna>) => {
          if (cisterna.body) {
            return of(cisterna.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Cisterna());
  }
}
