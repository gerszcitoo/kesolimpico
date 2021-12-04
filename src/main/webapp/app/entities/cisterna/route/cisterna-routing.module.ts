import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CisternaComponent } from '../list/cisterna.component';
import { CisternaDetailComponent } from '../detail/cisterna-detail.component';
import { CisternaUpdateComponent } from '../update/cisterna-update.component';
import { CisternaRoutingResolveService } from './cisterna-routing-resolve.service';

const cisternaRoute: Routes = [
  {
    path: '',
    component: CisternaComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CisternaDetailComponent,
    resolve: {
      cisterna: CisternaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CisternaUpdateComponent,
    resolve: {
      cisterna: CisternaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CisternaUpdateComponent,
    resolve: {
      cisterna: CisternaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cisternaRoute)],
  exports: [RouterModule],
})
export class CisternaRoutingModule {}
