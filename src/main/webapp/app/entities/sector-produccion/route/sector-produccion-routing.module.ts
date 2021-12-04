import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SectorProduccionComponent } from '../list/sector-produccion.component';
import { SectorProduccionDetailComponent } from '../detail/sector-produccion-detail.component';
import { SectorProduccionUpdateComponent } from '../update/sector-produccion-update.component';
import { SectorProduccionRoutingResolveService } from './sector-produccion-routing-resolve.service';

const sectorProduccionRoute: Routes = [
  {
    path: '',
    component: SectorProduccionComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SectorProduccionDetailComponent,
    resolve: {
      sectorProduccion: SectorProduccionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SectorProduccionUpdateComponent,
    resolve: {
      sectorProduccion: SectorProduccionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SectorProduccionUpdateComponent,
    resolve: {
      sectorProduccion: SectorProduccionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(sectorProduccionRoute)],
  exports: [RouterModule],
})
export class SectorProduccionRoutingModule {}
