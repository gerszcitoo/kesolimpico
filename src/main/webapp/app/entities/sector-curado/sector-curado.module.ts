import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { SectorCuradoComponent } from './list/sector-curado.component';
import { SectorCuradoDetailComponent } from './detail/sector-curado-detail.component';
import { SectorCuradoUpdateComponent } from './update/sector-curado-update.component';
import { SectorCuradoDeleteDialogComponent } from './delete/sector-curado-delete-dialog.component';
import { SectorCuradoRoutingModule } from './route/sector-curado-routing.module';

@NgModule({
  imports: [SharedModule, SectorCuradoRoutingModule],
  declarations: [SectorCuradoComponent, SectorCuradoDetailComponent, SectorCuradoUpdateComponent, SectorCuradoDeleteDialogComponent],
  entryComponents: [SectorCuradoDeleteDialogComponent],
})
export class SectorCuradoModule {}
