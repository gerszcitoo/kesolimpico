import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { SectorProduccionComponent } from './list/sector-produccion.component';
import { SectorProduccionDetailComponent } from './detail/sector-produccion-detail.component';
import { SectorProduccionUpdateComponent } from './update/sector-produccion-update.component';
import { SectorProduccionDeleteDialogComponent } from './delete/sector-produccion-delete-dialog.component';
import { SectorProduccionRoutingModule } from './route/sector-produccion-routing.module';

@NgModule({
  imports: [SharedModule, SectorProduccionRoutingModule],
  declarations: [
    SectorProduccionComponent,
    SectorProduccionDetailComponent,
    SectorProduccionUpdateComponent,
    SectorProduccionDeleteDialogComponent,
  ],
  entryComponents: [SectorProduccionDeleteDialogComponent],
})
export class SectorProduccionModule {}
