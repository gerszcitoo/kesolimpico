import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { RecepcionComponent } from './list/recepcion.component';
import { RecepcionDetailComponent } from './detail/recepcion-detail.component';
import { RecepcionUpdateComponent } from './update/recepcion-update.component';
import { RecepcionDeleteDialogComponent } from './delete/recepcion-delete-dialog.component';
import { RecepcionRoutingModule } from './route/recepcion-routing.module';

@NgModule({
  imports: [SharedModule, RecepcionRoutingModule],
  declarations: [RecepcionComponent, RecepcionDetailComponent, RecepcionUpdateComponent, RecepcionDeleteDialogComponent],
  entryComponents: [RecepcionDeleteDialogComponent],
})
export class RecepcionModule {}
