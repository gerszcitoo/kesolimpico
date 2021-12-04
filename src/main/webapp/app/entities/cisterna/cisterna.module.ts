import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { CisternaComponent } from './list/cisterna.component';
import { CisternaDetailComponent } from './detail/cisterna-detail.component';
import { CisternaUpdateComponent } from './update/cisterna-update.component';
import { CisternaDeleteDialogComponent } from './delete/cisterna-delete-dialog.component';
import { CisternaRoutingModule } from './route/cisterna-routing.module';

@NgModule({
  imports: [SharedModule, CisternaRoutingModule],
  declarations: [CisternaComponent, CisternaDetailComponent, CisternaUpdateComponent, CisternaDeleteDialogComponent],
  entryComponents: [CisternaDeleteDialogComponent],
})
export class CisternaModule {}
