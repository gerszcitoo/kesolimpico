import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { RecepcionComponent } from '../list/recepcion.component';
import { RecepcionDetailComponent } from '../detail/recepcion-detail.component';
import { RecepcionUpdateComponent } from '../update/recepcion-update.component';
import { RecepcionRoutingResolveService } from './recepcion-routing-resolve.service';

const recepcionRoute: Routes = [
  {
    path: '',
    component: RecepcionComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RecepcionDetailComponent,
    resolve: {
      recepcion: RecepcionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RecepcionUpdateComponent,
    resolve: {
      recepcion: RecepcionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RecepcionUpdateComponent,
    resolve: {
      recepcion: RecepcionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(recepcionRoute)],
  exports: [RouterModule],
})
export class RecepcionRoutingModule {}
