import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { SaladeroComponent } from './list/saladero.component';
import { SaladeroDetailComponent } from './detail/saladero-detail.component';
import { SaladeroUpdateComponent } from './update/saladero-update.component';
import { SaladeroDeleteDialogComponent } from './delete/saladero-delete-dialog.component';
import { SaladeroRoutingModule } from './route/saladero-routing.module';

@NgModule({
  imports: [SharedModule, SaladeroRoutingModule],
  declarations: [SaladeroComponent, SaladeroDetailComponent, SaladeroUpdateComponent, SaladeroDeleteDialogComponent],
  entryComponents: [SaladeroDeleteDialogComponent],
})
export class SaladeroModule {}
