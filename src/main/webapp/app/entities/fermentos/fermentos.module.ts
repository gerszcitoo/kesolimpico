import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { FermentosComponent } from './list/fermentos.component';
import { FermentosDetailComponent } from './detail/fermentos-detail.component';
import { FermentosUpdateComponent } from './update/fermentos-update.component';
import { FermentosDeleteDialogComponent } from './delete/fermentos-delete-dialog.component';
import { FermentosRoutingModule } from './route/fermentos-routing.module';

@NgModule({
  imports: [SharedModule, FermentosRoutingModule],
  declarations: [FermentosComponent, FermentosDetailComponent, FermentosUpdateComponent, FermentosDeleteDialogComponent],
  entryComponents: [FermentosDeleteDialogComponent],
})
export class FermentosModule {}
