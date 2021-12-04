import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'cisterna',
        data: { pageTitle: 'Cisternas' },
        loadChildren: () => import('./cisterna/cisterna.module').then(m => m.CisternaModule),
      },
      {
        path: 'recepcion',
        data: { pageTitle: 'Recepciones' },
        loadChildren: () => import('./recepcion/recepcion.module').then(m => m.RecepcionModule),
      },
      {
        path: 'fermentos',
        data: { pageTitle: 'Fermentos' },
        loadChildren: () => import('./fermentos/fermentos.module').then(m => m.FermentosModule),
      },
      {
        path: 'sector-produccion',
        data: { pageTitle: 'Sectores de Producción' },
        loadChildren: () => import('./sector-produccion/sector-produccion.module').then(m => m.SectorProduccionModule),
      },
      {
        path: 'sector-curado',
        data: { pageTitle: 'Sectores de Curado' },
        loadChildren: () => import('./sector-curado/sector-curado.module').then(m => m.SectorCuradoModule),
      },
      {
        path: 'saladero',
        data: { pageTitle: 'Saladeros' },
        loadChildren: () => import('./saladero/saladero.module').then(m => m.SaladeroModule),
      },
      {
        path: 'almacen',
        data: { pageTitle: 'Almacenes' },
        loadChildren: () => import('./almacen/almacen.module').then(m => m.AlmacenModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
