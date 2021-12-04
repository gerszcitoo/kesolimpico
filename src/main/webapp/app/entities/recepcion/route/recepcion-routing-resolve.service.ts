import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRecepcion, Recepcion } from '../recepcion.model';
import { RecepcionService } from '../service/recepcion.service';

@Injectable({ providedIn: 'root' })
export class RecepcionRoutingResolveService implements Resolve<IRecepcion> {
  constructor(protected service: RecepcionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRecepcion> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((recepcion: HttpResponse<Recepcion>) => {
          if (recepcion.body) {
            return of(recepcion.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Recepcion());
  }
}
