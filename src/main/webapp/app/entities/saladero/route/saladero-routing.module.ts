import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SaladeroComponent } from '../list/saladero.component';
import { SaladeroDetailComponent } from '../detail/saladero-detail.component';
import { SaladeroUpdateComponent } from '../update/saladero-update.component';
import { SaladeroRoutingResolveService } from './saladero-routing-resolve.service';

const saladeroRoute: Routes = [
  {
    path: '',
    component: SaladeroComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SaladeroDetailComponent,
    resolve: {
      saladero: SaladeroRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SaladeroUpdateComponent,
    resolve: {
      saladero: SaladeroRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SaladeroUpdateComponent,
    resolve: {
      saladero: SaladeroRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(saladeroRoute)],
  exports: [RouterModule],
})
export class SaladeroRoutingModule {}
