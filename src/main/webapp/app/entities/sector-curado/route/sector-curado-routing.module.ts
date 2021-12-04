import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SectorCuradoComponent } from '../list/sector-curado.component';
import { SectorCuradoDetailComponent } from '../detail/sector-curado-detail.component';
import { SectorCuradoUpdateComponent } from '../update/sector-curado-update.component';
import { SectorCuradoRoutingResolveService } from './sector-curado-routing-resolve.service';

const sectorCuradoRoute: Routes = [
  {
    path: '',
    component: SectorCuradoComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SectorCuradoDetailComponent,
    resolve: {
      sectorCurado: SectorCuradoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SectorCuradoUpdateComponent,
    resolve: {
      sectorCurado: SectorCuradoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SectorCuradoUpdateComponent,
    resolve: {
      sectorCurado: SectorCuradoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(sectorCuradoRoute)],
  exports: [RouterModule],
})
export class SectorCuradoRoutingModule {}
