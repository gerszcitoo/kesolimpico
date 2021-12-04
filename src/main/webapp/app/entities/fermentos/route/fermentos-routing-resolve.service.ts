import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFermentos, Fermentos } from '../fermentos.model';
import { FermentosService } from '../service/fermentos.service';

@Injectable({ providedIn: 'root' })
export class FermentosRoutingResolveService implements Resolve<IFermentos> {
  constructor(protected service: FermentosService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFermentos> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((fermentos: HttpResponse<Fermentos>) => {
          if (fermentos.body) {
            return of(fermentos.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Fermentos());
  }
}
