import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { FermentosComponent } from '../list/fermentos.component';
import { FermentosDetailComponent } from '../detail/fermentos-detail.component';
import { FermentosUpdateComponent } from '../update/fermentos-update.component';
import { FermentosRoutingResolveService } from './fermentos-routing-resolve.service';

const fermentosRoute: Routes = [
  {
    path: '',
    component: FermentosComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FermentosDetailComponent,
    resolve: {
      fermentos: FermentosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FermentosUpdateComponent,
    resolve: {
      fermentos: FermentosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FermentosUpdateComponent,
    resolve: {
      fermentos: FermentosRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(fermentosRoute)],
  exports: [RouterModule],
})
export class FermentosRoutingModule {}
